const expectedNode = '22.23.';
const expectedPnpm = '10.18.0';
const failures = [];

const nodeVersion = process.versions.node;
if (!nodeVersion.startsWith(expectedNode)) {
  failures.push(`Node ${nodeVersion} is unsupported; expected 22.23.x (canonical .node-version is 22.23.3)`);
}

const userAgent = process.env.npm_config_user_agent ?? '';
const pnpmMatch = userAgent.match(/pnpm\/([^\s]+)/);
if (!pnpmMatch) {
  failures.push('Unable to determine pnpm version from npm_config_user_agent; run this check through pnpm.');
} else if (pnpmMatch[1] !== expectedPnpm) {
  failures.push(`pnpm ${pnpmMatch[1]} is unsupported; expected ${expectedPnpm}`);
}

if (failures.length) {
  console.error('DHGS toolchain check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`DHGS toolchain verified: node=${nodeVersion} pnpm=${pnpmMatch[1]}`);
