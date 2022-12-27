import { createApp } from "vue"
import "./styles/style.scss"
// import "./styles/color-global.scss"
import App from "./App.vue"

import router from './router'

// import this settings so that it can load before the settings are called
import { Settings } from './settings'

const lifecycle = {
    init() {

        /* Wait for all initializations to be completed, does not matter if they are completed or rejected */
        
        var promises: Promise<any>[] = [Settings.initialize()]

        Promise.allSettled(promises).then(results => {
            results.forEach(result => {
                if (result.status == 'rejected') {
                    console.warn(`Initialization error: `, result.reason)
                } else {
                    console.log('Successfully initialized plugin: ', result.value)
                    // Pass the successful value somewhere?
                }
            })
        }).finally(() => {
            // continue to next lifecycle 
            this.main()
        })
    },
    main() {

        // Init Vue app
        createApp(App)
            .use(router)
            .mount("#app")

    },
    cleanup() {
        // meant for when the program exists

        console.log('Cleanup')
    }
}

lifecycle.init()