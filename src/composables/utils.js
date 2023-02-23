import { ElNotification } from 'element-plus'

export function toast(msg, type = 'success', dangerouslyUseHTMLString = false) {
  ElNotification({
    message: msg,
    type: type,
    dangerouslyUseHTMLString,
    duration: 2000
  })
}
