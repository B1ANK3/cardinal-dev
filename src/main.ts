import { createApp } from 'vue'
import './styles/style.scss'
// import "./styles/color-global.scss"
import App from './App.vue'

import router from './router'

// import this settings so that it can load before the settings are called
import { Settings } from './settings'
import { Logger } from './logger'
const log = Logger.init({ file: 'main' })

const lifecycle = {
	init() {
		/* Wait for all initializations to be completed, does not matter if they are completed or rejected */

		//! These are 2 different ways to create singletons and both have an initializing function
		//! Need a base class for extending to create consistent init plugins
		var promises: Promise<any>[] = [
			Settings.initialize(),
			Logger.initialize(),
		]

		//! Prefer classes over namespaces

		Promise.allSettled(promises)
			.then(results => {
				results.forEach(result => {
					if (result.status == 'rejected') {
						// console.warn(`Initialization error: `, result.reason)
						log.warn(`Initialization error: `, result.reason)
					} else {
						log.info(
							'Successfully initialized plugin: ',
							result.value
						)
						// Pass the successful value somewhere?
					}
				})
			})
			.finally(() => {
				// continue to next lifecycle
				this.main()
			})
	},
	main() {
		// Init Vue app
		createApp(App).use(router).mount('#app')
	},
	cleanup() {
		// meant for when the program exists

		log.info('Cleanup')
	},
}

lifecycle.init()
