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
  },
  {
    path: '/user/list',
    component: () => import('~/pages/user/list.vue'),
    name: '/user/list',
    meta: {
      title: '用户管理'
    }
  },
  {
    path: '/order/list',
    component: () => import('~/pages/order/list.vue'),
    name: '/order/list',
    meta: {
      title: '订单管理'
    }
  },
  {
    path: '/manager/list',
    component: () => import('~/pages/manager/list.vue'),
    name: '/manager/list',
    meta: {
      title: '管理员管理'
    }
  },
  {
    path: '/access/list',
    component: () => import('~/pages/access/list.vue'),
    name: '/access/list',
    meta: {
      title: '权限管理'
    }
  },
  {
    path: '/role/list',
    component: () => import('~/pages/role/list.vue'),
    name: '/role/list',
    meta: {
      title: '角色管理'
    }
  },
  {
    path: '/comment/list',
    component: () => import('~/pages/comment/list.vue'),
    name: '/comment/list',
    meta: {
      title: '评价管理'
    }
  },
  {
    path: '/image/list',
    component: () => import('~/pages/image/list.vue'),
    name: '/image/list',
    meta: {
      title: '图库管理'
    }
  },
  {
    path: '/notice/list',
    component: () => import('~/pages/notice/list.vue'),
    name: '/notice/list',
    meta: {
      title: '公告管理'
    }
  },
  {
    path: '/coupon/list',
    component: () => import('~/pages/coupon/list.vue'),
    name: '/coupon/list',
    meta: {
      title: '优惠券管理'
    }
  },
  {
    path: '/setting/base',
    component: () => import('~/pages/setting/base.vue'),
    name: '/setting/base',
    meta: {
      title: '系统配置'
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
