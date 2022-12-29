// export { has, get, set } from './settings/getter-setter';

import SettingsManager from './settings-manager/settings-manager'

// export { getSettings as getAll } from './fs/load-settings';
export { default as SettingsManager } from './settings-manager/settings-manager'

export * as CONSTANTS from './constants'
export type { IConfig, ConfigOptions } from './config/config'
