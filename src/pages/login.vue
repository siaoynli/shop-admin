<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎登陆后台管理系统</div>
        <div>Vite Admin 中台前端/设计解决方案</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <div>欢迎回来</div>
      <div class="sub-title">
        <span></span><span>账号密码登陆</span><span></span>
      </div>

      <el-form
        ref="loginFormRef"
        :model="form"
        class="w-[250px]"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="w-[250px]"
            round
            color="#626aef"
            :loading="loading"
            @click="onSubmit"
            >登陆</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'

import { useRouter } from 'vue-router'

import { toast } from '~/composables/utils'
import store from '~/store'

// access the `store` variable anywhere in the component ✨

const loginFormRef = ref(null)
const loading = ref(false)
const router = useRouter()

const form = reactive({
  username: 'admin',
  password: 'admin'
})

const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
}

const onSubmit = () => {
  loginFormRef.value.validate(valid => {
    if (!valid) {
      return false
    }
    loading.value = true
    store
      .dispatch('login', form)
      .then(() => {
        loading.value = false
        toast('登陆成功')
        router.push('/')
      })
      .finally(() => {
        loading.value = false
      })
  })
}
// 监听回车事件方法
const onKeyUp = e => {
  if (e.keyCode == 13) {
    onSubmit()
  }
}

onMounted(() => {
  document.addEventListener('keyup', onKeyUp)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp)
})

//监听键盘事件
</script>

<style scoped>
.login-container {
  @apply bg-indigo-500 min-h-screen;
}

.login-container .left,
.login-container .right {
  @apply flex justify-center items-center;
}

.login-container .right {
  @apply bg-light-50  flex-col;
}

.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-5;
}

.left > div > div:last-child {
  @apply text-gray-200 text-xl;
}

.right > div:first-child {
  @apply font-bold text-3xl text-gray-800;
}

.right .sub-title {
  @apply flex justify-center items-center my-5 text-gray-300 space-x-2;
}

.sub-title > span:first-child,
.sub-title > span:last-child {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
