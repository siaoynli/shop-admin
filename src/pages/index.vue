<template>
  <div>后台首页</div>

  <el-button @click="get">读取</el-button>
  <el-button @click="clear">清除</el-button>
  <div>token:{{ token }}</div>
</template>
<script setup>
import { ref } from 'vue'
import { getToken, removeToken } from '~/composables/auth'

const token = ref('')

function get() {
  token.value = getToken('admin-token')
  console.log(getToken('admin-token'))
}

function clear() {
  removeToken('admin-token')
}
</script>
