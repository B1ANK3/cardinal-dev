<template>
    <div class="number-input">
        <div class="input-wrapper">
            <input type="number" class="input" :value="defopt" @input="valChange($event)">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Settings } from '../../settings'

export interface IOption {
    name: string
    value: string
}

export default defineComponent({
    props: {
        value: Number,
        def: {
            type: Number,
            required: true
        },
        propname: {
            type: String,
            required: true
        }
    },
    mounted() {
        // TODO turn into computed values
        // let input = document.querySelector('input.input') as HTMLInputElement

        // input.valueAsNumber = this.value || this.def || 0
    },
    data() {

        let defopt: number = this.value || this.def || 0
        let pname = this.propname

        console.log(defopt)

        return {
            defopt,
            valChange(payload: Event) {
                console.log((payload.target as HTMLInputElement).value)
                Settings.set(pname, (payload.target as HTMLInputElement).valueAsNumber)
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.number-input {
    border: 1px solid black;

    .input-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        display: block;

        min-width: 0;

        .input {
            background-color: inherit;

            padding: 4px 6px;
            text-overflow: ellipsis;

            -webkit-appearance: none;
            appearance: none;

            width: 100px;
            font: inherit;
            font-size: 13px;
        }

        input {
            outline: none;

            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            line-height: inherit;
            border: none;
            font-family: inherit;
            font-size: inherit;
            resize: none;
            color: inherit;
        }
    }
}
</style>