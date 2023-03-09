import { router, addRoutes } from '~/router'
import { getToken } from '~/composables/auth'
import { toast, showFullLoading, hideFullLoading } from '~/composables/utils'
import store from './store'

//请求两次
let hasGetInfo = false

router.beforeEach(async (to, from, next) => {
  //显示全局loading
  showFullLoading()

  const token = getToken()
  console.log('to:', to)
  console.log('from:', from)
  if (!token && to.path != '/login') {
    toast('请先登陆', 'error')
    //路由配置了名字可以这么使用
    return next({ name: 'login' })
  }
  // 防止重复登陆
  if (token && to.path == '/login') {
    toast('请勿重复登陆', 'error')
    return next({ path: from.path ? from.path : '/' })
  }

  //设置页面标题
  let title = to.meta.title ? to.meta.title + '-杭州网' : ''
  document.title = title
  //动态路由，刷新页面报404
  let hasNewRoutes = false
  if (token && !hasGetInfo) {
    let { menus } = await store.dispatch('getUserInfo')
    hasGetInfo = true
    //动态添加路由
    hasNewRoutes = addRoutes(menus)
  }

  // next()
  hasNewRoutes ? next(to.fullPath) : next()
})

router.afterEach(() => {
  hideFullLoading()
})
