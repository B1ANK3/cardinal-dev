<template>
	<div class="container">
		<h1>Welcome to Cardinal</h1>
	</div>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineComponent } from 'vue'
import { invoke } from '@tauri-apps/api'

export default defineComponent({
	components: {
	},
	async mounted() {
		// vue is loaded and mounted onto page.

		// close splash screen on tauri
		invoke('close_splashscreen').then(bool => {
			console.log('Splash Screen closed from vue: ', bool)
		}).catch(err => {
			console.log('Splash Screen close not invoke or an error has occurred')
		})

		// updater
		// try {
		// 	const { shouldUpdate, manifest } = await checkUpdate()

		// 	console.log(manifest, shouldUpdate)

		// 	if (shouldUpdate) {
		// await installUpdate()

		// 		await relaunch()
		// 	}
		// } catch (error) {
		// 	console.log(error)
		// }

	}
})
</script>

<style lang="scss" scoped>
.container {

	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		font-size: xx-large;
		text-align: center;
	}
}
</style>
