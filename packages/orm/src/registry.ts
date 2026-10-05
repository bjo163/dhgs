import type { BaseRecord } from './types';
import type { ModelDefinition } from './model';
import { ModelRegistrationError, UnknownModelError } from './errors';

export class ModelRegistry {
  private readonly models = new Map<string, ModelDefinition>();

  register<T extends BaseRecord>(definition: ModelDefinition<T>): this {
    if (this.models.has(definition.name)) {
      throw new ModelRegistrationError(`Model already registered: ${definition.name}`);
    }
    this.models.set(definition.name, definition);
    return this;
  }

  get<T extends BaseRecord>(name: string): ModelDefinition<T> {
    const definition = this.models.get(name);
    if (!definition) throw new UnknownModelError(`Unknown model: ${name}`);
    return definition as ModelDefinition<T>;
  }

  has(name: string): boolean {
    return this.models.has(name);
  }

  list(): readonly ModelDefinition[] {
    return [...this.models.values()].sort((a, b) => a.name.localeCompare(b.name));
  }

  reset(): void {
    this.models.clear();
  }
}
