import { describe, expect, it } from 'vitest';
import { Institution } from '@dhgs/orm-base';
import { compileSelect, columnFor, quoteIdentifier } from '../sql.js';

const model = Institution;

describe('@dhgs/orm-postgres SQL compiler', () => {
  it('quotes identifiers and maps camelCase fields safely', () => {
    expect(quoteIdentifier('base_institutions')).toBe('"base_institutions"');
    expect(columnFor(model, 'jurisdictionId')).toBe('jurisdiction_id');
    expect(columnFor(model, 'parentInstitutionId')).toBe('parent_institution_id');
  });

  it('compiles nested parameterized domains without interpolating values', () => {
    const compiled = compileSelect(model, {
      domain: [
        { or: [['code', '=', 'A'], ['code', '=', "B' OR TRUE --"]] },
        ['jurisdictionId', 'in', ['J-1', 'J-2']]
      ],
      order: [{ field: 'name', direction: 'desc' }],
      limit: 10,
      offset: 5
    });
    expect(compiled.text).toContain('"code" = $1');
    expect(compiled.text).toContain('"jurisdiction_id" = ANY($3)');
    expect(compiled.text).toContain('ORDER BY "name" DESC');
    expect(compiled.text).not.toContain("B' OR TRUE");
    expect(compiled.values).toEqual(['A', "B' OR TRUE --", ['J-1', 'J-2'], 10, 5]);
  });

  it('uses explicit null semantics and rejects invalid bounds', () => {
    expect(compileSelect(model, { domain: [['archivedAt', '=', null]] }).text).toContain('"archived_at" IS NULL');
    expect(() => compileSelect(model, { limit: -1 })).toThrow('Invalid limit');
  });
});
