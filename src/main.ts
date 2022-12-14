import { createApp } from "vue"
import "./styles/style.scss"
// import "./styles/color-global.scss"
import App from "./App.vue"

import router from './router'

createApp(App)
    .use(router)
    .mount("#app")
