export type GeneratedUiMode = 'allowed' | 'read_only' | 'prohibited';

export interface UiPolicy {
  generated: GeneratedUiMode;
  create?: boolean;
  write?: boolean;
  archive?: boolean;
  actions?: readonly string[];
}

export type ViewKind = 'list' | 'form' | 'search';

export interface ViewSpec {
  id: string;
  model: string;
  kind: ViewKind;
  title: string;
  fields?: readonly string[];
  sections?: readonly {
    title?: string;
    fields: readonly string[];
  }[];
  filters?: readonly {
    id: string;
    label: string;
    domain: readonly unknown[];
  }[];
}

export interface MenuSpec {
  id: string;
  label: string;
  parent?: string;
  viewId?: string;
  order?: number;
}

export interface ActionSpec {
  id: string;
  model?: string;
  command: string;
  label: string;
}

export interface AccessSpec {
  id: string;
  model: string;
  group?: string;
  read: boolean;
  create: boolean;
  write: boolean;
  archive: boolean;
}
