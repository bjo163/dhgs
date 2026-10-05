import { defineAddon } from '@dhgs/orm';
import { baseModels } from './models';
import { baseData } from './data';
import { baseAccess, baseMenus, baseUiPolicies, baseViews } from './metadata';

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
