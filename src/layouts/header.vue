<template lang="">
  <div class="f-header">
    <span class="logo">
      <el-icon class="mr-1 text-2xl"><ChromeFilled /></el-icon>
      杭州网后台管理系统
    </span>
    <el-icon class="icon-btn"><Fold /></el-icon>
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center mr-2">
      <el-tooltip
        effect="dark"
        :content="isFullscreen ? '退出全屏' : '全屏'"
        placement="bottom"
      >
        <el-icon class="icon-btn" @click="toggle">
          <Aim v-if="isFullscreen" />
          <FullScreen v-else />
        </el-icon>
      </el-tooltip>
      <el-dropdown class="dropdown" trigger="click" @command="handleCommand">
        <span class="flex items-center">
          <el-avatar
            class="avatar"
            :size="25"
            :src="$store.state.user.avatar"
          />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="Lock" command="rePassword"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item :icon="ArrowLeft" command="logout"
              >退出登陆</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import {
  ChromeFilled,
  Fold,
  Refresh,
  FullScreen,
  ArrowDown,
  Lock,
  ArrowLeft,
  Aim
} from '@element-plus/icons-vue'
import { showModal, toast } from '~/composables/utils'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useFullscreen } from '@vueuse/core'
const router = useRouter()
const store = useStore()

const handleCommand = c => {
  switch (c) {
    case 'logout':
      logout()
      break

    default:
      console.log('修改密码')
      break
  }
}

const logout = () =>
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

const handleRefresh = () => location.reload()

const { isFullscreen, toggle } = useFullscreen()
</script>

<style scoped>
.f-header {
  @apply flex bg-indigo-700  text-light-50 fixed top-0 left-0 right-0 items-center;
  height: 64px;
}

.logo {
  width: 250px;
  @apply flex  items-center justify-center  text-xl font-thin;
}

.f-header .icon-btn {
  @apply items-center justify-center text-xl;
  height: 62px;
  width: 42px;
  cursor: pointer;
}
.f-header .icon-btn:hover {
  @apply bg-indigo-500;
}

.f-header .dropdown {
  height: 64px;
  cursor: pointer;
  @apply flex justify-center items-center text-light-50 mx-5;
}

.el-dropdown-link {
  @apply flex justify-center items-center;
}

.avatar {
  @apply mr-2;
}
</style>
