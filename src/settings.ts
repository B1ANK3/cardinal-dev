
/**
 * Common Setting interface, all settings are derived from this setting
 */
interface BasicSetting {
    title: {
        label: string
        category?: string
    }
    description?: string
    type: 'dropdown' | 'string' | 'number' | 'checkbox' | 'list' /* | 'heading'  */ | 'link' /* | 'none' */
    value: {
        name: string
        value: string
        description?: string
    }[] | string | number | boolean | string[]
    default?: string | number | boolean | {
        name: string
        value: string
        description?: string
    }
}

/**
 * Specific properties for dropdowns 
 */
interface DropdownSetting extends BasicSetting {
    type: 'dropdown'
    value: {
        name: string
        value: string
        description?: string
    }[]
    default?: {
        name: string
        value: string
        description?: string
    }
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
    value: {
        name: string
        value: string
        description?: string
    }[]
    default?: string | number
}): DropdownSetting {

    var def: {
        name: string
        value: string
        description?: string
    } | undefined

    // get the default value according to name
    if (typeof (options.default) == 'string') {
        def = options.value.map(v => {
            if (v.name == options.default) return v
        })[0]
    }

    // get value according to index
    if (typeof (options.default) == 'number') {
        def = options.value[options.default]
    }

    return {
        title: options.title,
        description: options.description,
        type: 'dropdown',
        value: options.value,
        default: def
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
    description?: string
    value: string
    default?: string
}): StringSetting {
    return {
        title: options.title,
        description: options.description,
        type: "string",
        value: options.value,
        default: options.default || ''
    }
}

/**
 * Specific properties for checkboxes
 */
interface BooleanSetting extends BasicSetting {
    type: 'checkbox'
    value: boolean
    default?: boolean
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
    description?: string
    value: boolean
    default?: boolean
}): BooleanSetting {
    return {
        title: options.title,
        description: options.description,
        type: "checkbox",
        value: options.value,
        default: options.default || false
    }
}

/**
 * Specific properties for number setting
 */
interface NumberSetting extends BasicSetting {
    type: 'number'
    value: number
    default?: number
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
    description?: string
    value: number,
    default?: number
}): NumberSetting {
    return {
        title: options.title,
        description: options.description,
        type: 'number',
        value: options.value,
        default: options.default || 0
    }
}

interface ListSetting extends BasicSetting {
    type: 'list'
    value: string[]
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
    title: string
    properties: {
        [key: string]: SettingTypes
    } | {
        subsection: {
            title: string
            properties: {
                [key: string]: SettingTypes
            }
        }[]
    }
}

export interface SettingSimplified {
    title: string
    subSettings: {
        title: string
        settings: {
            [key: string]: SettingTypes
        }
    }[]
    settings: {
        [key: string]: SettingTypes
    }
}

const s = [
    {
        title: 'foo bar',
        sub: [
            {
                title: 'hello world',
                settings: {
                    'application.foo': {},
                    'application.bar': {}
                }
            }
        ],
        settings: {
            'application.setting': {

            }
        }

    }
]

// TODO: Use this function to add extra metadata for api
/**
 * Remaps the Settings object into a simplified object for easy parsing on frontend. This is dumb and I want to fix this
 * @param settings 
 * @returns 
 */
function defineSettings(settings: Settings[]): SettingSimplified[] {

    return settings.map(section => {

        var sub: {
            title: string
            settings: {
                [key: string]: SettingTypes
            }
        }[] = []

        var set: {
            [key: string]: SettingTypes
        } = {}

        for (const key in section.properties) {

            if (key == 'subsection' && Array.isArray(section.properties.subsection)) {
                sub = section.properties.subsection.map(s => {
                    return {
                        title: s.title,
                        settings: s.properties
                    }
                })
            } else {
                set[key] = (section.properties as { [key: string]: SettingTypes })[key]
            }
        }

        return {
            title: section.title,
            settings: set,
            subSettings: sub
        }
    })
}

//! This will have to move to rust when the api has been created
export default defineSettings([
    {
        title: 'Application',
        properties: {
            subsection: [
                {
                    title: 'Font',
                    properties: {
                        'font.size': defineNumberSetting({
                            description: 'Font Size determined in pixels',
                            title: {
                                label: 'Font Size'
                            },
                            value: 42
                        })
                    }
                }
            ],

            'application.theme': defineDropdownSetting({
                title: {
                    label: 'Theme'
                },
                description: 'Set the application theme',
                value: [
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
            })
        }
    },
    {
        title: 'hi',
        properties: {}
    }
])