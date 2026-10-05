export class OrmError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class ModelRegistrationError extends OrmError {}
export class UnknownModelError extends OrmError {}
export class QueryValidationError extends OrmError {}
export class ScopeError extends OrmError {}
export class MutationContextError extends OrmError {}
export class VersionConflictError extends OrmError {}
export class ImmutableFieldError extends OrmError {}
export class HookConfigurationError extends OrmError {}
export class ValidationError extends OrmError {}
export class GeneratedUiError extends OrmError {}
export class AdminAuthorizationError extends OrmError {}
