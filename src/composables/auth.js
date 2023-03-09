import { useCookies } from '@vueuse/integrations/useCookies'
import { useStorage } from '@vueuse/core'

const TokenKey = 'admin-token'

const cookie = useCookies()

export function getToken() {
  return cookie.get(TokenKey) || ''
}
export function setToken(token) {
  cookie.set(TokenKey, token)
}
export function removeToken() {
  cookie.remove(TokenKey)
}

export function removeTab() {
  cookie.remove('tabList')
}
