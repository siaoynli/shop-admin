import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'

export function useTabList() {
  const route = useRoute()
  const router = useRouter()
  const cookie = useCookies()
  const activeTab = ref(route.path)
  const tabList = ref([])

  onBeforeMount(() => {
    tabList.value = cookie.get('tabList') || [
      {
        title: '仪表盘',
        path: '/'
      }
    ]
  })
  // 路由更新监听
  onBeforeRouteUpdate(to => {
    activeTab.value = to.path
    addTab({
      title: to.meta.title,
      path: to.path
    })
  })

  // 添加
  const addTab = tab => {
    //没有添加过
    let noTab = tabList.value.findIndex(item => item.path == tab.path) == -1
    if (noTab) {
      tabList.value.push(tab)
    }
    cookie.set('tabList', tabList.value)
  }

  const changeTab = path => {
    activeTab.value = path
    router.push(path)
  }

  // 删除tab
  const removeTab = path => {
    let aTab = activeTab.value
    let tabs = tabList.value
    //判断关闭是否是当前激活的
    if (aTab == path) {
      let next = tabs[0]
      tabs.forEach((tab, index) => {
        if (tab.path == path) {
          //拿到当前tab的下一个或者上一个
          next = tabs[index + 1] || tabs[index - 1]
        }
      })
      aTab = next
    }

    //过滤掉删除的项
    tabList.value = tabs.filter(tab => tab.path !== path)
    cookie.set('tabList', tabList.value)
    changeTab(aTab.path)
  }
  // 关闭标签
  const handleClose = e => {
    let tabs = tabList.value
    switch (e) {
      case 'closeOther':
        tabList.value = tabs.filter(
          tab => tab.path == '/' || tab.path == route.path
        )
        break

      default:
        tabList.value = tabs.filter(tab => tab.path == '/')
        activeTab.value = '/'
        break
    }
    cookie.set('tabList', tabList.value)
  }
  return {
    activeTab,
    tabList,
    changeTab,
    removeTab,
    handleClose
  }
}
