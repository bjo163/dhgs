import fs from 'node:fs';
import { pathToFileURL } from 'node:url';

const semver = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;

export function validateSoftwareVersions(packageVersion, fileVersion) {
  const failures = [];
  if (!semver.test(packageVersion ?? '')) failures.push(`package.json version is not semver: ${packageVersion}`);
  if (!semver.test(fileVersion ?? '')) failures.push(`VERSION is not semver: ${fileVersion}`);
  if (packageVersion !== fileVersion) failures.push(`version mismatch: package.json=${packageVersion} VERSION=${fileVersion}`);
  return failures;
}

export function readSoftwareVersions() {
  const pkg = JSON.parse(fs.readFileSync(new URL('../../package.json', import.meta.url), 'utf8'));
  const fileVersion = fs.readFileSync(new URL('../../VERSION', import.meta.url), 'utf8').trim();
  return { packageVersion: pkg.version, fileVersion };
}

export function runVersionCheck() {
  const { packageVersion, fileVersion } = readSoftwareVersions();
  const failures = validateSoftwareVersions(packageVersion, fileVersion);

  if (failures.length) {
    console.error('DHGS version consistency check failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    return 1;
  }

  console.log(`DHGS software version is consistent: ${fileVersion}`);
  return 0;
}

const invokedAsScript = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (invokedAsScript) {
  process.exitCode = runVersionCheck();
}
