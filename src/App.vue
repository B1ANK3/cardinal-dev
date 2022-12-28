<template>
	<div class="container">
		<h1>Welcome to Cardinal</h1>

		<!-- <h1>Welcome to Tauri!</h1>

    <div class="row">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo vite" alt="Vite logo" />
      </a>
      <a href="https://tauri.app" target="_blank">
        <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      +
      <a href="https://github.com/tauri-apps/tauri-vscode" target="_blank"
        >Tauri</a
      >
      +
      <a href="https://github.com/rust-lang/rust-analyzer" target="_blank"
        >rust-analyzer</a
      >
    </p> -->

		<!-- <Greet /> -->
	</div>
</template>

<script lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { defineComponent } from 'vue'
import { invoke } from '@tauri-apps/api'

export default defineComponent({
	components: {},
	mounted() {
		// vue is loaded and mounted onto page.

		// close splash screen on tauri
		invoke('close_splashscreen')
			.then(bool => {
				console.log('Splash Screen closed from vue: ', bool)
			})
			.catch(err => {
				console.log(
					'Splash Screen close not invoke or an error has occurred'
				)
			})
	},
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
