export class ContractValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContractValidationError';
  }
}

export interface ParseSuccess<T> { success: true; data: T; }
export interface ParseFailure { success: false; error: ContractValidationError; }
export type ParseResult<T> = ParseSuccess<T> | ParseFailure;

export interface ContractSchema<T> {
  readonly id: string;
  readonly version: string;
  parse(value: unknown): T;
  safeParse(value: unknown): ParseResult<T>;
  serialize(value: T): string;
  deserialize(serialized: string): T;
}

export function defineSchema<T>(id: string, version: string, parser: (value: unknown) => T): ContractSchema<T> {
  const parse = (value: unknown): T => parser(value);
  return Object.freeze({
    id,
    version,
    parse,
    safeParse(value: unknown): ParseResult<T> {
      try {
        return { success: true, data: parse(value) };
      } catch (error) {
        return {
          success: false,
          error: error instanceof ContractValidationError
            ? error
            : new ContractValidationError(error instanceof Error ? error.message : String(error))
        };
      }
    },
    serialize(value: T): string {
      return canonicalStringify(parse(value));
    },
    deserialize(serialized: string): T {
      let value: unknown;
      try {
        value = JSON.parse(serialized) as unknown;
      } catch {
        throw new ContractValidationError(`${id} received invalid JSON`);
      }
      return parse(value);
    }
  });
}

export function canonicalStringify(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    const object = value as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(object)
        .filter((key) => object[key] !== undefined)
        .sort()
        .map((key) => [key, canonicalize(object[key])])
    );
  }
  return value;
}
