<template>
	<TopNavBar />
	<div class="content">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineComponent } from 'vue'
import { invoke } from '@tauri-apps/api'
import TopNavBar from './components/TopNavBar.vue'

export default defineComponent({
	components: {
		TopNavBar
	},
	mounted() {
		// vue is loaded and mounted onto page.

		// close splash screen on tauri
		invoke('close_splashscreen').then(bool => {
			console.log('Splash Screen closed from vue: ', bool)
		}).catch(err => {
			console.log('Splash Screen close not invoke or an error has occurred')
		})


	}
})
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	// height: 100%;

	flex-grow: 1;

	// background-color: #121212;

	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
