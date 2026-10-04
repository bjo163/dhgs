import { defineAddon } from '@dhgs/orm';
import { baseModels } from './models.js';
import { baseData } from './data.js';
import { baseAccess, baseMenus, baseUiPolicies, baseViews } from './metadata.js';

export const manifest = defineAddon({
  name: 'base',
  version: '0.1.0',
  depends: [],
  models: baseModels,
  data: baseData,
  views: baseViews,
  menus: baseMenus,
  actions: [],
  access: baseAccess,
  uiPolicies: baseUiPolicies,
  hooks: [],
  upgrades: {}
});
