import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('../../', import.meta.url);
const packageUrl = new URL('package.json', root);
const versionUrl = new URL('VERSION', root);
const changelogUrl = new URL('CHANGELOG.md', root);

const args = new Map(process.argv.slice(2).map((arg) => {
  const [key, ...rest] = arg.replace(/^--/, '').split('=');
  return [key, rest.length ? rest.join('=') : 'true'];
}));
const apply = args.get('apply') === 'true';
const forced = args.get('force') && args.get('force') !== 'none' ? args.get('force') : null;

const git = (...argv) => execFileSync('git', argv, { encoding: 'utf8' }).trim();
const pkg = JSON.parse(fs.readFileSync(packageUrl, 'utf8'));
const currentVersion = String(pkg.version ?? '').trim();

function parseVersion(value) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(value);
  if (!match) throw new Error(`Expected stable semantic version, got: ${value}`);
  return match.slice(1).map(Number);
}

function bumpVersion(version, bump) {
  let [major, minor, patch] = parseVersion(version);
  if (bump === 'major') return `${major + 1}.0.0`;
  if (bump === 'minor') return `${major}.${minor + 1}.0`;
  if (bump === 'patch') return `${major}.${minor}.${patch + 1}`;
  throw new Error(`Unsupported bump: ${bump}`);
}

let latestTag = '';
try {
  latestTag = git('describe', '--tags', '--match', 'v[0-9]*', '--abbrev=0');
} catch {
  latestTag = '';
}

const isInitialRelease = !latestTag && !forced;
const baseVersion = latestTag ? latestTag.replace(/^v/, '') : currentVersion;
parseVersion(baseVersion);
const range = latestTag ? `${latestTag}..HEAD` : 'HEAD';
let rawLog = '';
try {
  rawLog = git('log', range, '--format=%H%x1f%s%x1f%b%x1e');
} catch {
  rawLog = '';
}

const commits = rawLog
  .split('\x1e')
  .map((entry) => entry.trim())
  .filter(Boolean)
  .map((entry) => {
    const [sha = '', subject = '', ...bodyParts] = entry.split('\x1f');
    return { sha, subject: subject.trim(), body: bodyParts.join('\x1f').trim() };
  })
  .filter((commit) => !/^chore\(release\):/i.test(commit.subject));

function commitType(subject) {
  const match = /^([a-zA-Z]+)(?:\([^)]*\))?(!)?:\s+(.+)$/.exec(subject);
  if (!match) return { type: 'other', breaking: false, description: subject };
  return {
    type: match[1].toLowerCase(),
    breaking: Boolean(match[2]),
    description: match[3],
  };
}

let bump = forced;
if (bump && !['major', 'minor', 'patch'].includes(bump)) {
  throw new Error(`--force must be major, minor, patch, or none; received ${bump}`);
}

if (isInitialRelease) {
  bump = 'initial';
} else if (!bump) {
  let rank = 0;
  for (const commit of commits) {
    const parsed = commitType(commit.subject);
    const breaking = parsed.breaking || /(^|\n)BREAKING CHANGE:/i.test(commit.body);
    if (breaking) rank = Math.max(rank, 3);
    else if (parsed.type === 'feat') rank = Math.max(rank, 2);
    else if (['fix', 'perf', 'revert'].includes(parsed.type)) rank = Math.max(rank, 1);
  }
  bump = rank === 3 ? 'major' : rank === 2 ? 'minor' : rank === 1 ? 'patch' : null;
}

const shouldRelease = Boolean(bump);
const nextVersion = bump === 'initial'
  ? currentVersion
  : shouldRelease
    ? bumpVersion(baseVersion, bump)
    : baseVersion;

const categoryNames = {
  feat: 'Features',
  fix: 'Fixes',
  perf: 'Performance',
  revert: 'Reverts',
  security: 'Security',
  docs: 'Documentation',
  test: 'Tests',
  build: 'Build',
  ci: 'CI',
  refactor: 'Refactoring',
  chore: 'Chores',
  other: 'Other',
};

function renderReleaseSection(version) {
  const date = new Date().toISOString().slice(0, 10);
  const groups = new Map();
  for (const commit of commits) {
    const parsed = commitType(commit.subject);
    const type = categoryNames[parsed.type] ? parsed.type : 'other';
    if (!groups.has(type)) groups.set(type, []);
    const short = commit.sha.slice(0, 7);
    const marker = parsed.breaking || /(^|\n)BREAKING CHANGE:/i.test(commit.body) ? ' **BREAKING**' : '';
    groups.get(type).push(`- ${parsed.description || commit.subject} (${short})${marker}`);
  }

  const order = ['security', 'feat', 'fix', 'perf', 'revert', 'refactor', 'docs', 'test', 'build', 'ci', 'chore', 'other'];
  const lines = [`## v${version} — ${date}`, ''];
  for (const type of order) {
    const items = groups.get(type);
    if (!items?.length) continue;
    lines.push(`### ${categoryNames[type]}`, '', ...items, '');
  }
  if (lines.length === 2) lines.push('- Release created by manual version override.', '');
  return lines.join('\n').trimEnd() + '\n';
}

if (shouldRelease && apply) {
  pkg.version = nextVersion;
  fs.writeFileSync(packageUrl, `${JSON.stringify(pkg, null, 2)}\n`);
  fs.writeFileSync(versionUrl, `${nextVersion}\n`);

  const marker = '<!-- release entries are inserted below this line -->';
  const currentChangelog = fs.existsSync(changelogUrl)
    ? fs.readFileSync(changelogUrl, 'utf8')
    : `# Changelog\n\n${marker}\n`;
  const section = renderReleaseSection(nextVersion);
  const updated = currentChangelog.includes(marker)
    ? currentChangelog.replace(marker, `${marker}\n\n${section}`)
    : `${currentChangelog.trimEnd()}\n\n${section}`;
  fs.writeFileSync(changelogUrl, updated);
}

const summary = {
  latestTag: latestTag || null,
  baseVersion,
  currentVersion,
  bump,
  initialRelease: isInitialRelease,
  shouldRelease,
  nextVersion,
  commitCount: commits.length,
};
console.log(JSON.stringify(summary, null, 2));

if (process.env.GITHUB_OUTPUT) {
  const output = [
    `should_release=${shouldRelease}`,
    `version=${nextVersion}`,
    `bump=${bump ?? 'none'}`,
    `tag=v${nextVersion}`,
    `initial_release=${isInitialRelease}`,
  ].join('\n');
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `${output}\n`);
}
