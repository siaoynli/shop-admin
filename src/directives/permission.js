import store from '~/store'

function hasPermission(value, el = false) {
  // v-permission绑定的参数判断
  if (!Array.isArray(value)) {
    throw new Error(`需要配置权限，例如 v-permission="['getStatistics2,GET']"`)
  }

  // 包含权限，索引就不等于-1
  const hasAuth = value.findIndex(v => store.state.ruleNames.includes(v)) != -1

  //节点存在，但是没有权限
  if (el && !hasAuth) {
    el.parentNode && el.parentNode.removeChild(el)
  }
  return hasAuth
}

export default {
  install(app) {
    console.log(`output->v-permission`, app)
    app.directive('permission', {
      // el 节点
      // binding  v-permission绑定的值
      mounted: (el, binding) => {
        console.log(`output->el`, el)
        console.log(`output->binding.value`, binding.value)
        hasPermission(binding.value, el)
      }
    })
  }
}
