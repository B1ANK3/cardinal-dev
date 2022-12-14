<template>
    <div class="group-title">
        <div class="group-title-label" :class="{ selected: selected }">{{ heading ?? '-' }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: [
        'heading'
    ],
    inject: [
        'selected'
    ],
    data() {
        return {
            selected: this.selected
        }
    },
})
</script>

<style lang="scss" scoped>
.group-title {

    max-width: min(100%, 1200px);
    width: 100%;
    margin: auto;
    padding-left: 24px;
    padding-right: 24px;

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

.selected {
    background-color: #999;
}
</style>