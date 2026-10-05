import assert from 'node:assert/strict';
import { validateSoftwareVersions } from './version-check.mjs';

const matching = validateSoftwareVersions('0.1.0', '0.1.0');
assert.deepEqual(matching, [], 'matching semantic versions must pass');

const mismatch = validateSoftwareVersions('0.1.0', '9.9.9');
assert.ok(
  mismatch.some((failure) => failure.includes('version mismatch')),
  'conflicting package.json and VERSION values must fail',
);

const invalidSemver = validateSoftwareVersions('not-semver', 'not-semver');
assert.ok(
  invalidSemver.some((failure) => failure.includes('package.json version is not semver')),
  'invalid package.json semver must fail',
);
assert.ok(
  invalidSemver.some((failure) => failure.includes('VERSION is not semver')),
  'invalid VERSION semver must fail',
);

console.log('Version consistency negative fixtures passed.');
