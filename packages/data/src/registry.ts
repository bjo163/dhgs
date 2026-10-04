import type { BaseRecord } from './types.js';
import type { ModelDefinition } from './model.js';

export class ModelRegistry {
  private readonly models = new Map<string, ModelDefinition>();

  register<T extends BaseRecord>(definition: ModelDefinition<T>): this {
    if (this.models.has(definition.name)) {
      throw new Error(`Model already registered: ${definition.name}`);
    }
    this.models.set(definition.name, definition);
    return this;
  }

  get<T extends BaseRecord>(name: string): ModelDefinition<T> {
    const definition = this.models.get(name);
    if (!definition) throw new Error(`Unknown model: ${name}`);
    return definition as ModelDefinition<T>;
  }

  list(): readonly ModelDefinition[] {
    return [...this.models.values()];
  }
}
