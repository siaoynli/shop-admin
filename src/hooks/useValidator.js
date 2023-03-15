export function useValidator(opt = {}) {
  const validatePassword = (rule, value, callback) => {
    if (value) {
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[._~!@#$^&*])[A-Za-z0-9._~!@#$^&*]{6,20}$/g.test(
          value
        )
      ) {
        callback(
          new Error('请输入包含英文字母大小写、数字和特殊符号的 6-20 位组合')
        )
      }
    }
    callback()
  }

  const validateRePassword = (rule, value, callback) => {
    if (value != undefined) {
      if (opt.password !== value) {
        callback(new Error('两次密码不一致'))
      }
    }
    callback()
  }
  return {
    validatePassword,
    validateRePassword
  }
}
