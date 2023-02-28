import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('~/layouts/admin.vue'),
    name: 'admin',
    //子路由
    children: [
      {
        path: '/',
        component: () => import('~/pages/index.vue'),
        name: 'index',
        meta: {
          title: '仪表盘'
        }
      },
      {
        path: '/goods/list',
        component: () => import('~/pages/goods/list.vue'),
        name: 'goodList',
        meta: {
          title: '商品管理'
        }
      }
    ]
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
