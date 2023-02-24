import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('~/pages/index.vue'),
    name: 'index',
    meta: {
      title: '后台首页'
    }
  },
  {
    path: '/login',
    component: () => import('~/pages/login.vue'),
    name: 'login',
    meta: {
      title: '登陆'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('~/pages/404.vue'),
    name: 'NotFound',
    meta: {
      title: '404'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
