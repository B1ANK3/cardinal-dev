import { ConfigOptions } from '../config/config';
import { STATUS } from '../fs/ensure-settings-file';

import { getSettings, saveSettings } from '../fs/load-settings';
// import { get, set } from '../settings/getter-setter';
// import { getDotNotation, setDotNotation } from '../utils/dot-notation';
import type { Path, PathValue } from '../types/dot-notation';

export class SettingsManager<SettingsSchema extends {} = any> {
    /**
     * @internal
     */
    settings!: SettingsSchema
    /**
     * The default values for the settings
     */
    default: SettingsSchema
    /**
     * @internal
     */
    path!: string
    options: ConfigOptions

    constructor(defaultSettings: SettingsSchema, options: ConfigOptions = {}) {
        this.default = { ...defaultSettings };
        this.options = { ...options };
    }

    /**
     * Initializes a settings file with the defaults. If settings exist, load them.
     * @returns The entire settings object
     */
    async initialize(): Promise<SettingsSchema> {
        const currentSettings = await getSettings<SettingsSchema>(this.options);
        this.path = currentSettings.path;

        if (currentSettings.status === STATUS.FILE_CREATED) {
            this.settings = { ...this.default };
            await this.saveSettings();
        }
        else if (currentSettings.status === STATUS.FILE_EXISTS) {
            //! This needs to include the defaults and merge the 2 objects
            // Object.assign(this.settings, this.default)
            this.settings = { ...currentSettings.settings };
        }

        let self = this

        // create a deep proxy on the settings object to detect changes 

        // TODO: This proxy handler is not typescript safe. Create a interface that can be used to add typings to this 
        const handler: ProxyHandler<SettingsSchema> = {
            set(target, prop, value): boolean {
                // console.log(`Changed: ${prop} from ${target[prop]} to ${value}`)
                // TODO: add specific typings for Proxies
                // @ts-ignore
                target[prop] = value
                // save settings when value changes
                self.saveSettings()
                return true
            },
            get(target, key) {
                // @ts-ignore
                if (typeof target[key] === 'object' && target[key] != null) {
                // @ts-ignore
                    return new Proxy(target[key], handler)
                }
                // @ts-ignore
                return target[key]
            }
        }      

        return new Proxy(this.settings, handler)

        // return this.settings;
    }

    /**
     * @internal
     */
    protected async saveSettings() {
        await saveSettings<SettingsSchema>(this.settings, this.path, this.options);
    }

    // public get(key: string): any {
    //     return this.settings[key]
    // }

    public getAll(): SettingsSchema {
        return this.settings
    }

    /**
     * Checks whether a key exists in the settings cache.
     * @param key The key for the setting. Key supports dot notation. See https://github.com/harshkhandeparkar/tauri-settings#dot-notation.
     */
    //   hasCache<K extends Path<SettingsSchema>>(key: K): boolean {
    //     return getDotNotation(this.settings, key) !== null;
    //   }

    /**
     * Sets the value of a setting from the cache.
     * @param key The key for the setting. Key supports dot notation. See https://github.com/harshkhandeparkar/tauri-settings#dot-notation.
     * @returns The value of the setting
     */
    //   getCache<K extends Path<SettingsSchema>>(key: K): PathValue<SettingsSchema, K> {
    //     if (!this.hasCache(key)) throw 'Error: key does not exist';

    //     return getDotNotation<SettingsSchema, K>(this.settings, key);
    //   }

    /**
     * Sets the value for a setting. Only updates cache.
     * @param key The key for the setting. Key supports dot notation. See https://github.com/harshkhandeparkar/tauri-settings#dot-notation.
     * @param value The new value for the setting
     * @returns The entire settings object
     */
    //   setCache<K extends Path<SettingsSchema>, V extends PathValue<SettingsSchema, K>>(key: K, value: V): V {
    //     if (!this.hasCache(key)) throw 'Error: key does not exist';

    //     setDotNotation<SettingsSchema, K>(this.settings, key, value);

    //     return value;
    //   }

    /**
     * Gets the value of a setting directly from the storage. Also updates cache.
     * @param key The key for the setting. Key supports dot notation. See https://github.com/harshkhandeparkar/tauri-settings#dot-notation.
     * @returns The value of the setting
     */
    //   async get<K extends Path<SettingsSchema>>(key: K): Promise<PathValue<SettingsSchema, K>> {
    //     const value = await get<SettingsSchema, K>(key, this.options);

    //     // to also update cache
    //     this.setCache(key, value);

    //     return value;
    //   }

    /**
     * Sets the value for a setting directly to the storage. Also updates cache.
     * @param key The key for the setting. Key supports dot notation. See https://github.com/harshkhandeparkar/tauri-settings#dot-notation.
     * @param value The new value for the setting
     * @returns The entire settings object
     */
    //   async set<K extends Path<SettingsSchema>, V extends PathValue<SettingsSchema, K>>(key: K, value: V): Promise<SettingsSchema> {
    //     // to also update cache
    //     this.setCache(key, value);

    //     return await set<SettingsSchema, K, V>(key, value, this.options);
    //   }

    /**
     * Saves the current settings cache to the storage.
     * @returns The entire settings object
     */
    //   async syncCache(): Promise<SettingsSchema> {
    //     await this.saveSettings();

    //     return this.settings;
    //   }
}