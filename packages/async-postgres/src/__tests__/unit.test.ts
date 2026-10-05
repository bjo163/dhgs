import { describe, expect, it } from 'vitest';
import { AsyncPostgresStore } from '../store';
describe('@dhgs/async-postgres unit', () => {
  it('exports the durable store', () => { expect(AsyncPostgresStore).toBeTypeOf('function'); });
});
