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

                                <div class="list-row">

                                    <div class="list-row-item">
                                        <div class="list-row-arrow">
                                            <div class="row-arrow"></div>
                                        </div>
                                        <div class="list-row-content">
                                            <div class="entry">Entry 1</div>
                                        </div>
                                    </div>

                                    <div class="list-items hide">
                                        <div class="list-row-content">
                                            <div class="entry">Sub heading</div>
                                        </div>
                                    </div>

                                </div>

                                <div class="list-row">

                                    <div class="list-row-item">
                                        <div class="list-row-arrow">
                                            <div class="row-arrow"></div>
                                        </div>
                                        <div class="list-row-content">
                                            <div class="entry">Entry 2</div>
                                        </div>
                                    </div>

                                </div>

                            </div>



                        </div>
                    </div>

                </div>
                <div class="view">

                    <div class="tree">
                        <div class="scrollable">
                            <div class="rows">

                                <template v-for="headings in settings">
                                    <RowItem>
                                        <GroupLabel :heading="headings.title" />
                                    </RowItem>

                                    <template v-for="setting in headings.settings">
                                        <RowItem>
                                            <SettingItem :setting="setting" />
                                        </RowItem>
                                    </template>

                                    <template v-for="subsection in headings.subSettings">
                                        <RowItem>
                                            <!-- TODO here we need to separate the settings from subheadings -->
                                            <GroupLabel :heading="subsection.title" />
                                        </RowItem>

                                        <template v-for="setting in subsection.settings">
                                            <RowItem>
                                                <SettingItem :setting="setting" />
                                            </RowItem>
                                        </template>
                                    </template>
                                </template>


                                <!-- <RowItem>
                                    <GroupLabel heading="Commonly Used" />
                                </RowItem> -->

                                <!-- <div class="row-item">
                                    <div class="row">
                                        <GroupLabel heading="Commonly Used" />
                                        <div class="group-title">
                                            <div class="group-title-label">Commonly Used</div>
                                        </div> 
                                    </div>
                                </div> -->

                                <!-- <RowItem selected="1">
                                    <GroupLabel heading="Testing Both" />
                                </RowItem>

                                <RowItem>
                                    <SettingItem />
                                </RowItem> -->

                                <!-- <div class="row-item">
                                    <div class="row">
                                        <div class="group-title">
                                            <div class="group-title-label">Commonly Used</div>
                                        </div>
                                    </div>
                                </div> -->

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

import settings from '../settings'

export default defineComponent({
    components: {
        GroupLabel,
        RowItem,
        SettingItem
    },
    data() {
        return {
            settings,
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

.hide {
    display: none!important;
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

                    .list-row-item {

                        display: flex;
                        height: 100%;
                        align-items: center;
                        position: relative;


                        .list-row-arrow {
                            padding-left: 8px;
                            padding-right: 6px;

                            flex-shrink: 0;
                            // width: 16px;
                            display: flex !important;
                            align-items: center;
                            justify-content: center;

                            height: 100%;
                            width: fit-content;

                            .row-arrow {

                                // TODO arrows turning animation
                                animation: arrow_turn 0.3s normal;

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

                        @keyframes arrow_turn {
                            0% {
                                transform: rotate(0deg);
                            }

                            100% {
                                transform: rotate(90deg);
                            }
                        }

                        .list-row-content {

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

                    .list-items {
                        display: flex;
                        flex-direction: column;
                        height: fit-content;

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

        .setting-item {}
    }
}
</style>