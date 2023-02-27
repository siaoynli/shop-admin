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

  <form-drawer
    ref="formDrawerRef"
    title="修改密码"
    destroy-on-close
    @submit="onSubmit"
  >
    <el-form
      ref="passwordFormRef"
      :model="form"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input
          v-model="form.password"
          placeholder="请输入新密码"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item prop="repassword" label="确认新密码">
        <el-input
          v-model="form.repassword"
          placeholder="请确认新密码"
          type="password"
          show-password
        />
      </el-form-item>
    </el-form>
  </form-drawer>
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
import { ref, reactive } from 'vue'
import { updatePassword } from '~/api/manager'

import FormDrawer from '~/components/from-drawer.vue'

const router = useRouter()
const store = useStore()

const form = reactive({
  oldpassword: '',
  password: '',
  repassword: ''
})
const passwordFormRef = ref(null)

const rules = {
  oldpassword: [
    {
      required: true,
      message: '请输入旧密码',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入新密码',
      trigger: 'blur'
    }
  ],
  repassword: [
    {
      required: true,
      message: '请确认新密码',
      trigger: 'blur'
    }
  ]
}

const formDrawerRef = ref(null)
// 修改密码

const handleCommand = c => {
  switch (c) {
    case 'logout':
      logout()
      break

    default:
      formDrawerRef.value.open()
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

const onSubmit = () => {
  passwordFormRef.value.validate(valid => {
    if (!valid) {
      return false
    }
    formDrawerRef.value.showLoading()
    updatePassword(form)
      .then(() => {
        toast('修改密码成功，请重新登陆')
        store.dispatch('logout')
        router.push('/')
      })
      .finally(() => {
        formDrawerRef.value.hideLoading()
      })
  })
}
</script>

<style scoped lang="postcss">
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
