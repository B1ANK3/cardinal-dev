<template>
    <div class="container">
        <!-- Home -->
        <div class="testbox"></div>
        <div class="testbox1"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;

    background-color: $primary;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.testbox1 {
    width: 100px;
    height: 100px;

    border-radius: 4px;

    @include dp16 (#121212);
}

</style>