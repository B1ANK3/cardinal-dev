
/**
 * Common Setting interface, all settings are derived from this setting
 */
interface BasicSetting {
    name: {
        label: string
        category?: string
    }
    description?: string
    type: 'dropdown' | 'string' | 'number' | 'checkbox' | 'list' /* | 'heading'  */ | 'link' /* | 'none' */
    deprecated: boolean
    // The value should not be set here but rather default should be set for new settings
    // Value is by default the default value, the program will set the value 
    value: DropdownValue | string | number | boolean
    options?: DropdownValue[] | string | number | boolean | string[]
    default: DropdownValue | string | number | boolean
}

// Same typings from settings.ts for dropdowns
export interface DropdownValue {
    name: string
    value: string | number | boolean
    description?: string
}

/**
 * Specific properties for dropdowns 
 */
interface DropdownSetting extends BasicSetting {
    type: 'dropdown'
    value: DropdownValue | string
    options: DropdownValue[] | string[]
    default: DropdownValue | string
}

/**
 * Drop down helper. 
 * Default is either a string which maps to the name of one of the values or an index mapping to an index in the array.
 * @param options Options for creating a dropdown 
 */
function defineDropdownSetting(options: {
    title: {
        label: string
        category?: string
    }
    description?: string
    deprecated: boolean
    options: DropdownValue[] | string[]
    default: string | number
}): DropdownSetting {

    var def: DropdownValue | string

    // get the default value according to name
    if (typeof (options.default) == 'string') {
        def = options.options.map(v => {
            if (typeof v == 'string') {
                if (v == options.default) return v
            } else {
                if (v.name == options.default) return v
            }
        })[0] || options.options[0] //? If the string does not match, make the 0th index the default
    }

    // get value according to index
    if (typeof (options.default) == 'number') {
        def = options.options[options.default]
    }

    // there are no object in the options 
    if (Object.keys(options.options).length <= 0) {
        def = '' //? Make it an empty string
    }

    return {
        name: options.title,
        description: options.description,
        deprecated: options.deprecated,
        type: 'dropdown',
        options: options.options,
        value: def!,
        default: def!
    }
}
/**
 * Specific properties for strings 
 */
interface StringSetting extends BasicSetting {
    type: 'string'
    value: string
    default: string
}

/**
 * Helper function for creating a string setting. 
 * Default is an empty string
 * @param options Options for string setting
 */
function defineStringSetting(options: {
    title: {
        label: string
        category?: string
    }
    deprecated: boolean
    description?: string
    default: string
}): StringSetting {
    return {
        name: options.title,
        description: options.description,
        deprecated: options.deprecated,
        type: "string",
        value: options.default,
        default: options.default
    }
}

/**
 * Specific properties for checkboxes
 */
interface BooleanSetting extends BasicSetting {
    type: 'checkbox'
    value: boolean
    default: boolean
}

/**
 * Helper function for creating boolean settings. 
 * Booleans are displayed as checkboxes and the default is false.
 * @param options Options for creating a boolean setting
 */
function defineBooleanSetting(options: {
    title: {
        label: string
        category?: string
    }
    deprecated: boolean
    description?: string
    default: boolean
}): BooleanSetting {
    return {
        name: options.title,
        description: options.description,
        type: "checkbox",
        deprecated: options.deprecated,
        value: options.default,
        default: options.default
    }
}

/**
 * Specific properties for number setting
 */
interface NumberSetting extends BasicSetting {
    type: 'number'
    value: number
    default: number
}

/**
 * Helper function for creating Number settings. 
 * Default is 0
 * @param options Options for creating number settings
 */
function defineNumberSetting(options: {
    title: {
        label: string
        category?: string
    }
    deprecated: boolean
    description?: string
    default: number
}): NumberSetting {
    return {
        name: options.title,
        description: options.description,
        deprecated: options.deprecated,
        type: 'number',
        value: options.default,
        default: options.default
    }
}

interface ListSetting extends BasicSetting {
    type: 'list'
    options: string[]
}

// Headings should be automatic 
interface HeadingSetting /* extends BasicSetting */ {

}

// Ignore link setting for now
interface LinkSetting extends BasicSetting {
    type: 'list'
    value: string
}

export type SettingTypes = DropdownSetting | StringSetting | BooleanSetting | NumberSetting

/**
 * Interface for settings object. The settings file is a json file with a collection of settings that go into the settings page
 */
export interface Settings {
    [key: string]: {
        title: string
        properties: {
            // This is able to have sub headings but fir simplicity rn, we not including it
            [key: string]: SettingTypes /* | SubSettings */
        }
    }
}

export interface SubSettings {
    [key: string]: {
        title: string
        properties: {
            [key: string]: SettingTypes
        }
    }
}

// TODO: Use this function to add extra metadata for api
/**
 * Remaps the Settings object into a simplified object for easy parsing on frontend. This is dumb and I want to fix this
 * @param settings 
 * @returns 
 */
function defineSettings(settings: Settings): Settings {
    return settings
}

//! This will have to move to rust when the api has been created
const defaults = defineSettings({
    'application': {
        title: 'Application',
        properties: {
            /**
             * Application theme. Currently only supports Light and Dark themes controlled by css
             */
            'application.theme': defineDropdownSetting({
                title: {
                    label: 'Theme'
                },
                description: 'Set the application theme',
                deprecated: false,
                options: [
                    {
                        name: 'Dark Theme',
                        value: 'dark',
                        description: 'Dark Application Theme'
                    },
                    {
                        name: 'Light Theme',
                        value: 'light',
                        description: 'Light Application Theme'
                    }
                ],
                default: 0
            }),

            //? Currently does nothing in the program, so remove it until its actually implemented
            // 'application.active': defineBooleanSetting({
            //     title: {
            //         label: 'Active'
            //     },
            //     deprecated: false,
            //     default: true,
            //     description: 'Auto starts client on game launch'
            // })
        }
    },
    //? Same as .active
    // 'font': {
    //     title: 'Font',
    //     properties: {
    //         'font.size': defineNumberSetting({
    //             description: 'Font Size determined in pixels',
    //             title: {
    //                 label: 'Size'
    //             },
    //             deprecated: false,
    //             // value: 42,
    //             default: 42
    //         }),

    //         'font.family': defineStringSetting({
    //             title: {
    //                 label: 'Family'
    //             },
    //             description: 'Font family of application',
    //             deprecated: false,
    //             // value: 'Oxygen',
    //             default: 'Oxygen'
    //         }),
    //     }
    // }
})

import { checkTauri } from './util'
import { SettingsManager } from 'settings-manager'

// regular 'settings.json' file doesn't have a proper getAll so we set the name of the file to write to it
// in the future i'll have to make a fork or similar project for making settings as this is very finicky and
// breaks when using settings manager. Also typings is a problem because of the dot-notation.
//* Fixed this. Made a 'fork' that only uses a getter to get all settings and has a proxy to detect changes in values
// Not sure how reactive this will be with Vue
const settingManager = new SettingsManager<Settings>(defaults, { filename: 'settings', prettify: true, removeNonDefaults: true })

// https://stackoverflow.com/questions/47946363/typescript-how-to-export-const-in-a-promise
export namespace Settings {
    let singletonSettings: Settings
    let watchSettings: {[key: string]: ((value: any) => void)[]} = {}
    export function getAll(): Settings {
        return singletonSettings
    }
    export function initialize(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // Check Tauri
            if (!checkTauri()) {
                reject('Not running in Tauri environment')
                return
            }
            // Check if reinitialized?
            if (singletonSettings) {
                reject('Setting has already been initialized!')
                return
            }
            settingManager.initialize().then(settings => {
                console.log('Initialized SettingsManager')
                singletonSettings = settings
                resolve()
            }).catch(reject)
        })
    }
    export function watch(key: string, callback: (value: string | number | boolean | DropdownValue | undefined) => void, immediate: boolean = false) {
        if (watchSettings[key]) {
            watchSettings[key].push(callback)
        } else {
            watchSettings[key] = [callback]
        }

        if (immediate) {
            callback(get(key))
        }
    }
    export function get(key: string) {
        if (!checkTauri()) return

        const [head, _] = key.split('.')
        const clone = getAll()

        if (!clone) return
        if (!clone[head]) return
        if (!clone[head].properties[key]) return

        return clone[head].properties[key].value
    }
    export function set(key: string, value: any) {
        if (!checkTauri()) return

        const [head, _] = key.split('.')
        const clone = getAll()

        if (!clone) return
        if (!clone[head]) return
        if (!clone[head].properties[key]) return

        //? Proxy handles change in values
        console.log(`Setting ${key} changing from `, clone[head].properties[key].value, value)
        clone[head].properties[key].value = value

        if (watchSettings[key]) {
            watchSettings[key].forEach(callback => {
                callback(value)
            })
        }
    }
}

export default checkTauri() ? Settings.getAll() : defaults