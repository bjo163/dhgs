import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const lockfile = readFileSync(new URL('../../pnpm-lock.yaml', import.meta.url));
const lockfileSha256 = createHash('sha256').update(lockfile).digest('hex');
const userAgent = process.env.npm_config_user_agent ?? '';
const pnpmVersion = userAgent.match(/pnpm\/([^\s]+)/)?.[1] ?? 'unknown';
const softwareVersion = readFileSync(new URL('../../VERSION', import.meta.url), 'utf8').trim();

const provenance = {
  softwareVersion,
  node: process.versions.node,
  pnpm: pnpmVersion,
  lockfile: 'pnpm-lock.yaml',
  lockfileSha256
};

console.log(JSON.stringify(provenance, null, 2));
