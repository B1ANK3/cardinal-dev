<template>
	<div class="row-item">
		<div class="row">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss">
.row-item {
	display: block;
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
	}
}
</style>
