import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
const pinia = createPinia()

const initialViewportHeight = window.innerHeight

setInterval(() => {
    if (window.innerHeight / initialViewportHeight > 0.8) {
        window.scrollTo(0, 0)
    }
}, 1000)

window.addEventListener('blur', () => {
    window.scrollTo(0, 0)
})


createApp(App).use(pinia).use(router).mount('#app')