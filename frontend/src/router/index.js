import { createRouter, createWebHistory } from 'vue-router'
import ScoutingPage from '../pages/ScoutingPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import HomePage from '../pages/HomePage.vue'
import EditingPage from '../pages/EditingPage.vue'
import FileBrowserPage from '../pages/FileBrowserPage.vue'
import AdminPage from '../pages/AdminPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      needAuth: false
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
      needAuth: false
    }
  },
  {
    path: '/scout',
    name: 'ScoutingPage',
    component: ScoutingPage,
    meta: {
      needAuth: true
    }
  },
  {
    path: '/edit',
    name: 'EditingPage',
    component: EditingPage,
    meta: {
      needAuth: true
    }
  },
  {
    path: '/files',
    name: 'FileBrowserPage',
    component: FileBrowserPage,
    meta: {
      needAuth: true
    }
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    meta: {
      needAuth: true
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.needAuth) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({ name: 'LoginPage' })
    }
  } else {
    next()
  }
})

export default router