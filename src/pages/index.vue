<template>
  <div>
    后台首页 {{ $store.state.user.username }}
    <el-button @click="logout">退出登陆</el-button>
  </div>
</template>
<script setup>
import { showModal, toast } from '~/composables/utils'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
function logout() {
  showModal('您确认要退出系统吗?')
    .then(() => {
      store
        .dispatch('logout')
        .then(res => {
          toast(res)
        })
        .finally(() => {
          router.push('/login')
        })
    })
    .catch(() => {})
}
</script>
