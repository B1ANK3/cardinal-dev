<template>
    <div class="select-container">
        <select title="Test Value" class="select-box" @input="valChange($event)">
            <template v-for="{ name, value } in defopt">
                <option :value="value" :selected="name == defVal.name">{{ name }}</option>
            </template>
        </select>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Settings, DropdownValue } from '../../settings'

export default defineComponent({
    props: {
        options: Array<DropdownValue | string>,
        def: {
            type: Object as PropType<String | Boolean | Number | DropdownValue>,
            required: true
        },
        value: {
            type: Object as PropType<string | DropdownValue>,
            required: true
        },
        propname: {
            type: String,
            required: true
        }
    },
    emits: ['isDefaultValue'],
    data() {

        // Default the options if teh dropbox is only a string array
        let defopt: DropdownValue[] = this.options?.map(v => {
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
        let defVal: DropdownValue = ((v: string | DropdownValue): DropdownValue => {
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
        })(this.value)
        let pname = this.propname

        console.log(defopt)

        //! Move this to methods or something?
        const v_emit = this.$emit

        return {
            defopt,
            defVal,
            valChange(payload: Event) {
                // console.log((payload.target as HTMLSelectElement).value)

                // TODO: use the index of the options to get the selected value

                let selected = defopt.filter(v => v.value == (payload.target as HTMLSelectElement).value)[0]
                if (!selected) {
                    console.log('Unexpected dropdown value does not exist', selected)
                    return
                }

                // Default option selected
                v_emit('isDefaultValue', defVal, selected)

                console.log(pname, selected)
                Settings.set(pname, selected)
            }
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