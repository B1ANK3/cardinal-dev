<template>
    <div class="container">
        <!-- Controls width -->
        <div class="settings-editor">

            <!-- Implement when needed. Has a search bar etc -->
            <!-- <div class="settings-header"></div> -->

            <div class="settings-body">
                <div class="common">

                    <div class="list">
                        <div class="scrollable-list">
                            <div class="list-rows">

                                <!-- Don't need to move this to its own  component as its all the same -->
                                <template v-for="headings in settings">
                                    <div class="list-row">
                                        <div class="list-row-item" @click="toggleSubheading($event)">
                                            <div class="list-row-arrow">
                                                <div class="row-arrow"></div>
                                            </div>
                                            <div class="list-row-content">
                                                <div class="entry">{{ headings.title }}</div>
                                            </div>
                                        </div>
                                        <div class="list-items">

                                            <template v-for="sub in headings.properties">
                                                <div class="list-content-container">
                                                    <div class="list-row-content">
                                                        <div class="entry">{{ sub.name.label }}</div>
                                                    </div>
                                                </div>
                                            </template>

                                        </div>
                                    </div>
                                </template>


                            </div>

                        </div>
                    </div>

                </div>
                <div class="view">

                    <div class="tree">
                        <div class="scrollable">
                            <div class="rows">

                                <template v-for="headings in settings" v-if="settings != undefined">
                                    <RowItem>
                                        <GroupLabel :heading="headings.title" />
                                    </RowItem>

                                    <template v-for="setting in headings.properties">
                                        <RowItem>
                                            <SettingItem :type="setting.type" :setting="setting" />
                                        </RowItem>
                                    </template>

                                    <!-- <template v-for="subsection in headings.properties">
                                        <RowItem>
                                            TODO here we need to separate the settings from subheadings
                                            <GroupLabel :heading="subsection.title" />
                                        </RowItem>

                                        <template v-for="setting in subsection.settings">
                                            <RowItem>
                                                <SettingItem :type="setting.type" :setting="setting" />
                                            </RowItem>
                                        </template>
                                    </template> -->
                                </template>

                                <template v-else>
                                    <div class="ntauri">
                                        Not running in Tauri environment
                                    </div>
                                </template>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GroupLabel from '@/components/Setting.GroupTitle.vue'
import RowItem from '@/components/Setting.RowItem.vue'
import SettingItem from '@/components/Setting.SettingItem.vue'

// import settings from '../settings'
import settings, { get, getAll } from '../settings'
// import { getAll } from 'tauri-settings';

// const settings = (await getAll())?.settings

export default defineComponent({
    components: {
        GroupLabel,
        RowItem,
        SettingItem
    },
    data() {

        function toggleSubheading(event: MouseEvent) {
            var target = (event.target as HTMLDivElement).parentElement
            target?.classList.toggle('open')
        }

        return {
            settings,
            toggleSubheading
        }
    },
    mounted() {



        // This is cool and all but why is there no vue property for this?
        // gonna use a media query 

        // function sizing (entries: ResizeObserverEntry[]) {
        //     let rect = entries[0].contentRect

        //     console.log(rect.width)

        //     if (rect.width < 200) {
        //         entries[0].target.classList.add('hide')
        //     } else {
        //         if (entries[0].target.classList.contains('hide')) {
        //             entries[0].target.classList.remove('hide')
        //         }
        //     }
        // }

        // new ResizeObserver(sizing).observe(document.querySelector('.common')!)
    }
})
</script>

<style lang="scss" scoped>
.container {

    display: block;

    height: 100%;
    width: 100%;
}

.settings-editor {
    overflow: hidden;
    max-width: 1200px;
    height: 100%;
    width: 100%;
    margin: auto;
    padding: 0 8px;
}

.settings-body {
    margin-top: 16px;
    position: relative;
    display: flex;
    justify-content: space-between;
    // height: 100%;
    // 16px is the amount the view is moved down because of the parent margin
    // this lets the user scroll to the last setting on the page
    height: calc(100% - 16px);
    width: 100%;

    .common {
        height: 100%;
        white-space: nowrap;

        max-width: 250px;
        width: 25%;
    }

    @media (max-width: 816px) {
        .common {
            display: none;
        }
    }



}

.common {
    .list {

        pointer-events: auto;
        outline: 0 !important;

        -webkit-user-select: none;
        user-select: none;

        position: relative;
        height: 100%;
        width: 100%;
        white-space: nowrap;

        .scrollable-list {
            position: relative;
            overflow: hidden;
            padding-top: 0;

            height: 100%;

            display: block;

            .list-rows {
                overflow: hidden;
                contain: strict;
                transform: translate3d(0px, 0px, 0px);
                left: 0;
                top: 0;
                height: 100%;

                position: relative;
                width: 100%;
                display: block;

                .list-row {

                    // height: 22px;
                    height: fit-content;
                    line-height: 22px;

                    cursor: pointer;
                    width: 100%;
                    overflow: hidden;

                    display: block;

                    pointer-events: none;

                    .list-row-item {

                        pointer-events: all;

                        display: flex;
                        height: 100%;
                        align-items: center;
                        position: relative;

                        &:hover {
                            // TODO COLOURSSS
                            background-color: darken(#fff, 10%);
                        }

                        .list-row-arrow {
                            padding-left: 8px;
                            padding-right: 6px;

                            pointer-events: none;

                            flex-shrink: 0;
                            // width: 16px;
                            display: flex !important;
                            align-items: center;
                            justify-content: center;

                            height: 100%;
                            width: fit-content;

                            .row-arrow {

                                // TODO arrows turning animation
                                // animation: 0.3s normal;

                                width: 16px;
                                height: 16px;

                                background: url('@/assets/arrow-right.svg') no-repeat center center;
                                background-size: contain;
                                opacity: 1;
                                transition: opacity 0.3s;

                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }

                        }

                        .list-row-content {

                            pointer-events: none;

                            display: flex;
                            flex: 1;
                            overflow: hidden;
                            height: 100%;

                            .entry {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                line-height: 22px;
                                flex-shrink: 1;
                                display: block;
                            }
                        }

                    }

                    &:not(.open)>.list-items {
                        display: none !important;
                    }

                    &.open .row-arrow {
                        transform: rotate(90deg);
                        transition: 0.3s linear;
                    }

                    .list-items {
                        display: flex;
                        flex-direction: column;
                        height: fit-content;
                        pointer-events: visible;

                        .list-content-container {

                            width: 100%;
                            height: 100%;
                            display: block;
                            overflow: hidden;
                            flex: 1;

                            &:hover {
                                // TODO Colours
                                background-color: darken(#fff, 50%);
                            }

                            .list-row-content {

                                margin-left: 40px;
                                display: flex;
                                flex: 1;
                                overflow: hidden;
                                height: 100%;

                                .entry {
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    line-height: 22px;
                                    flex-shrink: 1;
                                    display: block;
                                }
                            }
                        }

                    }

                }

            }
        }

    }
}

.view {
    height: 100%;
    // flexbox position
    flex-grow: 1;

    // separating line
    &::before {
        position: absolute;
        display: block;
        top: 0;
        width: 1px;
        height: 100%;
        background-color: black;
        content: " ";
    }

    .tree {
        display: block;
        width: 100%;
        height: 100%;

        border-spacing: 0;
        border-collapse: separate;
        position: relative;

        .scrollable {
            position: relative;
            // width: 100%;
            height: 100%;
            white-space: nowrap;
            display: block;
            padding-top: 0;

            user-select: none;
            -webkit-user-select: none;

            .rows {
                contain: strict;
                min-height: 100%;
                position: relative;
                width: 100%;
                overflow-y: auto;
                display: block;

                .ntauri {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    font-size: xx-large;

                    height: 100%;
                    width: 100%;
                }

            }

        }

    }

}

.selected {
    background-color: darken(white, 16%);
}

.row-item {
    display: block;
    // overflow: visible;
    cursor: default;
    width: 100%;
    // TODO this needs to be dynamic fit-content?
    // height: 42px;
    height: fit-content;

    .row {

        display: flex;
        height: 100%;
        width: 100%;
        align-items: center;
        position: relative;

        .group-title {

            max-width: min(100%, 1200px);
            width: 100%;
            margin: auto;
            padding-left: 24px;
            padding-right: 24px;
            // overflow: visible;

            .group-title-label {

                font-weight: 600;
                font-size: 26px;
                color: black;
                height: 100%;
                padding: 10px 10px 10px 15px;
                position: relative;
                overflow: hidden;
                width: 100%;
                text-overflow: ellipsis;

            }
        }
    }
}
</style>