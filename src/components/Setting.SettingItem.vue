<template>
    <div class="setting-item">
        <div class="contents" :class="{ selected: selected }">

            <div class="title">
                <div class="title-container">
                    <span class="category">{{ setting?.title.category || '' }}</span>
                    <span class="label">{{ setting?.title.label }}</span>
                </div>
            </div>

            <div class="description">
                <div class="markdown">
                    {{ setting?.description }}
                    <!-- <p>Hello, this is a description</p> -->
                </div>
            </div>

            <!-- TODO: Modded indicator is based on default values -->
            <div class="modifier-indicator"></div>

            <div class="value">
                <!-- TODO: Setting Types -->
                <Dropdown :options="opt" />
            </div>

            <!-- <div class="value">

                <div class="select-container">
                    <select title="Test Value" class="select-box">
                        <option value="op1">Option 1</option>
                        <option value="op2">Option 2</option>
                        <option value="op3">Option 3</option>
                    </select>
                </div>
            </div> -->



            <div class="deprecated-msg">
                <div class="error">Setting is deprecated</div>
            </div>

            <div class="toolbar-container">
                <div class="toolbar">
                    <div class="action-bar">
                        <ul class="action-container">
                            <li class="action-item">
                                <div class="dropdown">
                                    <div class="dropdown-label">
                                        <a role="button" title="More Options..."></a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>



<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from '@/components/setting-values/Setting.Dropdown.vue'
import { IOption } from './setting-values/Setting.Dropdown.vue'
import { SettingTypes } from '../settings'

const opt: IOption[] = [
    { name: 'Option', value: "Option 1" },
    { name: 'another option', value: 'wow' }
]

export default defineComponent({
    props: {
        setting: Object as PropType<SettingTypes>,
        selected: Boolean
    },
    components: {
        Dropdown
    },
    data() {

        // TODO add catch here if passed settings are not of type SettingType

        return {
            opt,
        }
    }
})
</script>

<style lang="scss" scoped>
.setting-item {

    max-width: min(100%, 1200px);
    margin: auto;
    padding-left: 24px;
    padding-right: 24px;
    overflow: visible;

    flex: 1;

    height: 100%;
    display: block;

    cursor: default;

    .contents {

        position: relative;
        padding: 12px 14px 18px;
        white-space: normal;
        display: block;
        outline-offset: -1px;


        .title {

            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;

            .title-container {

                float: left;

                span.category {
                    opacity: 0.9;
                    font-weight: 600;
                    user-select: text;
                    -webkit-user-select: text;
                }

                span.label {
                    opacity: 0.9;
                    font-weight: 600;
                    user-select: text;
                    -webkit-user-select: text;

                    margin-right: 7px;
                }
            }

            .misc-title {
                display: none;
                font-style: italic;
            }
        }

        .description {

            // TODO colors
            // color: ;
            margin-top: -1px;
            user-select: text;
            -webkit-user-select: text;

            // Markdown is excessive rn and normal html can be used
            .markdown {

                font-weight: bold;

                * {
                    margin: 0;
                }
            }
        }

        .modifier-indicator {
            display: block;
            content: " ";
            position: absolute;
            width: 6px;
            border-left: 2px solid black;

            // TODO Are these relative?
            left: 5px;
            top: 15px;
            bottom: 18px;
        }

        .value {

            display: flex;
            margin-top: 9px;
            white-space: normal;

            .select-container {

                min-width: 0;
                position: relative;

                .select-box {
                    font: inherit;
                    height: 26px;
                    padding: 2px 6px;
                }

                select {

                    // background-color: white;
                    color: black;
                    border-color: black;

                    width: 320px;

                    option {
                        // Dont need this

                        font-weight: normal;
                        display: block;
                        white-space: nowrap;
                        min-height: 1.2em;
                        padding: 0px 2px 1px;

                    }

                    &::after {
                        content: "\eab4";
                        font-size: 16px;
                        width: 16px;
                        height: 16px;
                        line-height: 16px;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        right: 6px;
                        margin: auto;
                        pointer-events: none;
                    }
                }

            }

        }

        .deprecated-msg {

            color: red;
            margin-top: 3px;
            user-select: text;
            -webkit-user-select: text;

            // Changes dynamically
            display: none;

            .error {
                color: inherit !important;
                font-size: 16px;

                text-decoration: none;
                text-rendering: auto;
                text-align: center;
                text-transform: none;
            }
        }

        .toolbar-container {

            position: absolute;
            left: -22px;
            top: 8px;
            bottom: 0;
            width: 22px;
            height: 22px;

            white-space: normal;

            .toolbar {

                height: 100%;

                .action-bar {

                    white-space: nowrap;
                    height: 100%;

                    ul.action-container {

                        display: flex;
                        margin: 0 auto;
                        padding: 0;
                        height: 100%;
                        width: 100%;
                        align-items: center;

                        li.action-item {
                            // shadow roots? 
                            // find another way to do dropdowns

                            display: block;
                            align-items: center;
                            justify-content: center;
                            cursor: pointer;
                            position: relative;
                            height: 100%;
                            width: 100%;

                            text-align: -webkit-match-parent;

                            .dropdown {

                                height: 100%;
                                padding: 10%;

                                .dropdown-label {

                                    cursor: pointer;
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;

                                    a {

                                        // TODO: figure out how fill works on svgs

                                        background: url('@/assets/options.svg') no-repeat center center;
                                        background-size: contain;
                                        width: 100%;
                                        height: 100%;

                                        fill: red;

                                        opacity: 1;
                                        color: inherit !important;

                                        display: flex;
                                        transition: opacity 0.3s;
                                        align-items: center;
                                        justify-content: center;
                                    }

                                }

                            }

                        }

                    }

                }

            }

        }

    }

}

.selected {
    background-color: #999;
}
</style>