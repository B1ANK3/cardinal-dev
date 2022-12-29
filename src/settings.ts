/**
 * Common Setting interface, all settings are derived from this setting
 */
interface BasicSetting {
	name: {
		label: string
		category?: string
	}
	description?: string
	type:
		| 'dropdown'
		| 'string'
		| 'number'
		| 'checkbox'
		| 'list' /* | 'heading'  */
		| 'link' /* | 'none' */
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
	//! Can't set value in setting
	// value: {
	//     name: string
	//     value: string
	//     description?: string
	// } | string
	options: DropdownValue[] | string[]
	default: string | number
}): DropdownSetting {
	var def: DropdownValue | string

	// get the default value according to name
	if (typeof options.default == 'string') {
		def =
			options.options.map(v => {
				if (typeof v == 'string') {
					if (v == options.default) return v
				} else {
					if (v.name == options.default) return v
				}
			})[0] || options.options[0] //? If the string does not match, make the 0th index the default
	}

	// get value according to index
	if (typeof options.default == 'number') {
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
		default: def!,
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
	// value: string
	default: string
}): StringSetting {
	return {
		name: options.title,
		description: options.description,
		deprecated: options.deprecated,
		type: 'string',
		value: options.default,
		default: options.default,
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
	// value: boolean
	default: boolean
}): BooleanSetting {
	return {
		name: options.title,
		description: options.description,
		type: 'checkbox',
		deprecated: options.deprecated,
		value: options.default,
		default: options.default,
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
	// value: number,
	default: number
}): NumberSetting {
	return {
		name: options.title,
		description: options.description,
		deprecated: options.deprecated,
		type: 'number',
		value: options.default,
		default: options.default,
	}
}

interface ListSetting extends BasicSetting {
	type: 'list'
	options: string[]
}

// Headings should be automatic
interface HeadingSetting /* extends BasicSetting */ {}

// Ignore link setting for now
interface LinkSetting extends BasicSetting {
	type: 'list'
	value: string
}

export type SettingTypes =
	| DropdownSetting
	| StringSetting
	| BooleanSetting
	| NumberSetting

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
function defineSettings(
	settings: Settings
): /* SettingSimplified[] */ Settings {
	return settings
	// return settings.map(section => {

	//     var sub: {
	//         title: string
	//         settings: {
	//             [key: string]: SettingTypes
	//         }
	//     }[] = []

	//     var set: {
	//         [key: string]: SettingTypes
	//     } = {}

	//     for (const key in section.properties) {

	//         if (key == 'subsection' && Array.isArray(section.properties.subsection)) {
	//             sub = section.properties.subsection.map(s => {
	//                 return {
	//                     title: s.title,
	//                     settings: s.properties
	//                 }
	//             })
	//         } else {
	//             set[key] = (section.properties as { [key: string]: SettingTypes })[key]
	//         }
	//     }

	//     return {
	//         title: section.title,
	//         settings: set,
	//         subSettings: sub
	//     }
	// })
}

//! This will have to move to rust when the api has been created
const defaults = defineSettings({
	application: {
		title: 'Application',
		properties: {
			// subsection: {
			//     'Font': {
			//         title: 'Font',
			//         properties: {
			//             'font.size': defineNumberSetting({
			//                 description: 'Font Size determined in pixels',
			//                 title: {
			//                     label: 'Font Size'
			//                 },
			//                 deprecated: false,
			//                 value: 42
			//             }),
			//             'font.family': defineStringSetting({
			//                 title: {
			//                     label: 'Font Family'
			//                 },
			//                 description: 'Font family of application',
			//                 deprecated: false,
			//                 value: 'Oxygen',
			//                 default: 'Oxygen'
			//             })
			//         }
			//     }
			// },

			'application.theme': defineDropdownSetting({
				title: {
					label: 'Theme',
				},
				description: 'Set the application theme',
				deprecated: false,
				options: [
					{
						name: 'Dark Theme',
						value: 'dark',
						description: 'Dark Application Theme',
					},
					{
						name: 'Light Theme',
						value: 'light',
						description: 'Light Application Theme',
					},
				],
				default: 0,
			}),

			'application.active': defineBooleanSetting({
				title: {
					label: 'Active',
				},
				deprecated: false,
				// value: true,
				default: true,
				description: 'Auto starts client on game launch',
			}),
		},
	},
	font: {
		title: 'Font',
		properties: {
			'font.size': defineNumberSetting({
				description: 'Font Size determined in pixels',
				title: {
					label: 'Size',
				},
				deprecated: false,
				// value: 42,
				default: 42,
			}),

			'font.family': defineStringSetting({
				title: {
					label: 'Family',
				},
				description: 'Font family of application',
				deprecated: false,
				// value: 'Oxygen',
				default: 'Oxygen',
			}),
		},
	},
})

// Potential composition API
// const compSettings:{
//     [key: string]: {
//         title: string
//         properties: {
//             test => any
//         }
//     }
// } = {
//     'application': {
//         title: 'Application',
//         properties: {
//             test('font.size', {

//             }),
//             test('font.language', {

//             })
//         }
//     }
// }

// function test(key: string, options: {}): any {
//     return
// }

import { checkTauri } from './util'
import { SettingsManager } from 'settings-manager'
import { Logger } from './logger'

const log = Logger.init({ file: 'settings' })

// regular 'settings.json' file doesn't have a proper getAll so we set the name of the file to write to it
// in the future i'll have to make a fork or similar project for making settings as this is very finicky and
// breaks when using settings manager. Also typings is a problem because of the dot-notation.
//* Fixed this. Made a 'fork' that only uses a getter to get all settings and has a proxy to detect changes in values
// Not sure how reactive this will be with Vue
const settingManager = new SettingsManager<Settings>(defaults, {
	filename: 'settings',
	prettify: true,
})
// if (checkTauri())
//     settingManager.initialize().then(() => {
//         // sync Cache here <- don't need cache rn
//         console.log('Initialized Settings')
//         // settingManager.setCache();
//     })

// https://stackoverflow.com/questions/47946363/typescript-how-to-export-const-in-a-promise
// TODO: Convert into class, namespace is problematic sometimes and classes are easier. Maybe look at monads?
// the only reason this is here is because i couldn't figure out how to create a class singleton that can also be exported at
// a function level. ie import {get} from '.' but in the end, its still namespace.function so its kinda pointless.
// Using statics, you can export a single class function but then the class has to be instantiated for stuff to work
/**
 * class T {method() {}}
 * const t = new T()
 * const method = t.method
 * export {method}
 */
export namespace Settings {
	let singletonSettings: Settings
	let i: number = 0
	export function getAll(): Settings {
		log.info('Accessing singleton settings: ', i++)
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
			settingManager
				.initialize()
				.then(settings => {
					log.info('Initialized SettingsManager')
					singletonSettings = settings
					resolve()
				})
				.catch(reject)
		})
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
		log.info(
			`Setting ${key} changing from `,
			clone[head].properties[key].value,
			value
		)
		clone[head].properties[key].value = value
	}
}

//! No cache in forked version as of v0.0.1
// Saves current settings to cache ie ram
// await settingManager.syncCache()

// export async function get(key: string) {
//     if (!checkTauri()) return

//     const [head, _] = key.split('.')
//     const clone = await settingManager.getAll()

//     if (!clone) return
//     if (!clone[head]) return
//     // can accept 2 types of key: eg. 'fonts.size' or 'size'
//     if (!clone[head].properties[key] /* && !clone[head].properties[sub] */) return

//     return clone[head].properties[key].value
// }

// export async function set(key: string, value: any) {
//     if (!checkTauri()) return

//     // debugger

//     const [head, _] = key.split('.')
//     const clone = await settingManager.getAll()

//     if (!clone) return
//     if (!clone[head]) return
//     // can accept 2 types of key: eg. 'fonts.size' or 'size'
//     if (!clone[head].properties[key] /* && !clone[head].properties[sub] */) return

//     //? Proxy handles change in values
//     console.log(`Setting ${key} changing from ${clone[head].properties[key].value} to ${value}`)
//     clone[head].properties[key].value = value
// }

export default checkTauri() ? Settings.getAll() : defaults
