import { createRouter, createWebHistory } from 'vue-router'
import ScoutingPage from '../pages/ScoutingPage.vue'
import HomePage from '../pages/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/scout',
    name: 'ScoutingPage',
    component: ScoutingPage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router