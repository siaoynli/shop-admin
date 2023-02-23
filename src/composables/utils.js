import { ElNotification } from 'element-plus'

export function toast(msg, type = 'success') {
  ElNotification({
    message: msg,
    type: type,
    duration: 2000
  })
}
