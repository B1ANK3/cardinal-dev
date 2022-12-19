<template>
    <div class="select-container">
        <select title="Test Value" class="select-box">
            <template v-for="{ name, value } in defopt">
                <option :value="value">{{ name }}</option>
            </template>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

// Same typings from settings.ts for dropdowns
export interface IOption {
    name: string | number | boolean
    value: string | number | boolean
    description?: string
}

export default defineComponent({
    props: {
        value: Array<IOption | string>,
        def: Object as PropType<String | Boolean | Number | IOption>
    },
    data() {

        // Default the options if teh dropbox is only a string array
        let defopt: IOption[] = this.value?.map(v => {
            if (typeof v == 'string') {
                return {
                    name: v,
                    value: v
                }
            }
            return {
                name: v.name,
                value: v.value,
                description: v.description
            }
        }) || []

        return {
            defopt
        }
    }
})
</script>

<style lang="scss" scoped>
.select-container {

    min-width: 0;
    position: relative;

    .select-box {
        width: 320px;
        font: inherit;
        // height: 26px;
        // TODO: Font size setting
        font-size: 13px;
        padding: 2px 6px;
    }

    &::after {

        background: url('@/assets/arrow-down.svg') no-repeat center center;
        background-size: contain;

        opacity: 1;
        color: inherit !important;

        display: flex;
        transition: opacity 0.3s;
        align-items: center;
        justify-content: center;

        content: " ";
        width: 16px;
        height: 16px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 6px;
        margin: auto;
        pointer-events: none;
    }

    select {

        outline: none;
        border: solid 1px;
        font-family: inherit;
        cursor: pointer;
        border-radius: 2px;

        -webkit-appearance: none;
        appearance: none;

        option {

            font-weight: normal;
            display: block;
            white-space: nowrap;
            min-height: 1.2em;
            padding: 0px 2px 1px;

            cursor: pointer;
        }

    }

}
</style>