import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readdirSync } from 'fs'

function globalStyleSheets(): string {
	let files = ''

	readdirSync(resolve(__dirname, './src/styles'))
		.filter(v => v.includes('.global.'))
		.forEach(v => {
			files += `@import "@/styles/${v}";\n`
		})

	return files
}

console.log(globalStyleSheets())

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],

	// CSS options for global styles
	css: {
		preprocessorOptions: {
			scss: {
				// To fix error regrading the file loading itself and creating a circular dependency
				additionalData(source: string, fp: string) {
					// ignore files that end in .global.scss
					if (fp.includes('.global.')) return source
					return `${globalStyleSheets()}${source}`
				},
			},
		},
	},

	// Resolve @ alias for importing modules and css files
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},

	// Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
	// prevent vite from obscuring rust errors
	clearScreen: false,
	// tauri expects a fixed port, fail if that port is not available
	server: {
		port: 1420,
		strictPort: true,
	},
	// to make use of `TAURI_DEBUG` and other env variables
	// https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
	envPrefix: ['VITE_', 'TAURI_'],
	build: {
		// Tauri supports es2021
		target: ['es2021', 'chrome100', 'safari13'],
		// don't minify for debug builds
		minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_DEBUG,
	},
})
