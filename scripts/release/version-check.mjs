import fs from 'node:fs';

const semver = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const pkg = JSON.parse(fs.readFileSync(new URL('../../package.json', import.meta.url), 'utf8'));
const fileVersion = fs.readFileSync(new URL('../../VERSION', import.meta.url), 'utf8').trim();

const failures = [];
if (!semver.test(pkg.version ?? '')) failures.push(`package.json version is not semver: ${pkg.version}`);
if (!semver.test(fileVersion)) failures.push(`VERSION is not semver: ${fileVersion}`);
if (pkg.version !== fileVersion) failures.push(`version mismatch: package.json=${pkg.version} VERSION=${fileVersion}`);

if (failures.length) {
  console.error('DHGS version consistency check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`DHGS software version is consistent: ${fileVersion}`);
