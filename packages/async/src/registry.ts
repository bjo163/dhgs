import type { JobHandler } from './types';

export class JobHandlerRegistry {
  private readonly handlers = new Map<string, JobHandler>();

  register(handler: JobHandler): this {
    if (!handler.type.trim()) throw new Error('Job handler type is required');
    if (!Number.isInteger(handler.version) || handler.version < 1) throw new Error('Job handler version must be a positive integer');
    const key = handlerKey(handler.type, handler.version);
    if (this.handlers.has(key)) throw new Error(`Duplicate job handler: ${key}`);
    this.handlers.set(key, handler);
    return this;
  }

  get(type: string, version: number): JobHandler {
    const handler = this.handlers.get(handlerKey(type, version));
    if (!handler) throw new Error(`Unregistered job handler: ${type}@${version}`);
    return handler;
  }

  list(): readonly JobHandler[] {
    return [...this.handlers.values()].sort((a, b) => handlerKey(a.type, a.version).localeCompare(handlerKey(b.type, b.version)));
  }
}

function handlerKey(type: string, version: number): string {
  return `${type}@${version}`;
}
