<template>
    <div class="string-input">
        <div class="input-wrapper">
            <input type="text" class="input" @input="valChange" :value="defopt">
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
        value: String,
        def: {
            type: String,
            required: true
        },
        propname: {
            type: String,
            required: true
        }
    },
    mounted() {
        // let input = document.querySelector('input.input') as HTMLInputElement

        // input.value = this.value || this.def || ''
    },
    data() {

        let defopt: string = this.value || this.def || ''
        let pname: string = this.propname
        console.log(defopt)

        return {
            defopt,
            valChange(payload: Event) {
                console.log((payload.target as HTMLInputElement).value)
                Settings.set(pname, (payload.target as HTMLInputElement).value)
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.string-input {
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

            width: 400px;
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