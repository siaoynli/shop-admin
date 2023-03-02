import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('~/layouts/admin.vue'),
    name: 'admin',
    meta: {
      title: '仪表盘'
    }
    //子路由
  },
  {
    path: '/login',
    component: () => import('~/pages/login.vue'),
    name: 'login',
    meta: {
      title: '登陆'
    }
  }
]

//动态路由，用户匹配菜单动态添加路由
const asyncRoutes = [
  {
    path: '/',
    component: () => import('~/pages/index.vue'),
    name: '/',
    meta: {
      title: '仪表盘'
    }
  },
  {
    path: '/goods/list',
    component: () => import('~/pages/goods/list.vue'),
    name: '/goods/list',
    meta: {
      title: '商品管理'
    }
  },
  {
    path: '/category/list',
    component: () => import('~/pages/category/list.vue'),
    name: '/category/list',
    meta: {
      title: '分类管理'
    }
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//动态添加路由的方法

export function addRoutes(menus) {
  //增加判断是否是新路由
  let hasNewRoutes = false
  const findAndAddRouteByMenus = arr => {
    arr.forEach(e => {
      let item = asyncRoutes.find(o => o.path == e.frontpath)
      if (item && !router.hasRoute(item.path)) {
        //添加路由到子路由
        router.addRoute('admin', item)
        hasNewRoutes = true
      }

      if (e.child && e.child.length) {
        findAndAddRouteByMenus(e.child)
      }
    })
  }
  findAndAddRouteByMenus(menus)

  router.addRoute({
    path: '/:pathMatch(.*)*',
    component: () => import('~/pages/404.vue'),
    name: 'NotFound',
    meta: {
      title: '404'
    }
  })

  // console.log('路由列表:', router.getRoutes())
  return hasNewRoutes
}
