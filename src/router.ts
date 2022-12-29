import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Settings from './views/Settings.vue'

export default createRouter({
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: '/settings',
            component: Settings
        }
    ],
    history: createWebHistory()
})