import axios from 'axios'

import { useCookies } from '@vueuse/integrations/useCookies'
import { toast } from '~/composables/utils'
import store from '~/store'

const service = axios.create({
  baseURL: '/api'
})

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    const cookie = useCookies()
    const token = cookie.get('admin-token') || ''
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    return response.data.data
  },
  function (error) {
    const res = error.response.data
    const message = res.msg || '请求失败,请检查网络'
    if (message == '非法token，请先登录！') {
      store.dispatch('logout').finally(() => location.reload())
    }
    toast(message, 'error')

    return Promise.reject(error)
  }
)

export default service
