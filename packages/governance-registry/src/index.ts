export * from './types';
export * from './ids';
export * from './registry';
export * from './seed';

import { createRegistry } from './registry';
import { registrySeed } from './seed';

export const governanceRegistry = createRegistry(registrySeed);
