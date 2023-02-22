<template>
  <el-row class="bg-indigo-500 min-h-screen">
    <el-col :lg="16" :md="12" class="flex justify-center items-center">
      <div>
        <div class="font-bold text-5xl text-light-50 mb-5">
          欢迎登陆后台管理系统
        </div>
        <div class="text-gray-200 text-xl">
          Vite Admin 中台前端/设计解决方案
        </div>
      </div>
    </el-col>
    <el-col
      :lg="8"
      :md="12"
      class="bg-light-50 flex justify-center items-center flex-col"
    >
      <div class="font-bold text-3xl text-gray-800">欢迎回来</div>
      <div
        class="flex justify-center items-center my-5 text-gray-300 space-x-2"
      >
        <span class="h-[1px] w-16 bg-gray-200"></span><span>账号密码登陆</span
        ><span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <div>
        <el-form :model="form" class="w-[250px]">
          <el-form-item>
            <el-input
              v-model="form.username"
              placeholder="请输入用户名"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="w-[250px]"
              round
              color="#626aef"
              @click="onSubmit"
              >登陆</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
// do not use same name with ref
const form = reactive({
  username: '',
  password: ''
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
