import { ElNotification, ElMessageBox } from 'element-plus'
import nProgress from 'nprogress'

export function toast(msg, type = 'success', dangerouslyUseHTMLString = true) {
  ElNotification({
    message: msg,
    type: type,
    dangerouslyUseHTMLString,
    duration: 2000
  })
}

export function showModal(
  content = '提示内容',
  type = 'warning',
  title = '请确认'
) {
  return ElMessageBox.confirm(content, title, {
    distinguishCancelAndClose: true,
    type: type,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  })
}

export function showPrompt(
  message,
  inputValue = '',
  title = '提示',
  inputPattern = '',
  inputErrorMessage = ''
) {
  return ElMessageBox.prompt(message, title, {
    inputValue: inputValue,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: inputPattern,
    inputErrorMessage: inputErrorMessage
  })
}

export function showFullLoading() {
  nProgress.start()
}

export function hideFullLoading() {
  nProgress.done()
}
