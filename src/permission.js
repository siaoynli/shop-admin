import router from '~/router'
import { getToken } from '~/composables/auth'
import { toast } from '~/composables/utils'
import store from './store'

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  console.log('to:', to)
  console.log('from:', from)
  if (!token && to.path != '/login') {
    toast('请先登陆', 'error')
    return next({ path: '/login' })
  }
  // 防止重复登陆
  if (token && to.path == '/login') {
    toast('请勿重复登陆', 'error')
    return next({ path: from.path ? from.path : '/' })
  }

  if (token) {
    await store.dispatch('getUserInfo')
  }
  next()
})
