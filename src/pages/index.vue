<template>
  <div>后台首页</div>

  <el-button @click="get">读取</el-button>
  <el-button @click="clear">清除</el-button>
  <div>token:{{ token }}</div>
</template>
<script setup>
import { ref } from 'vue'
import { useCookies } from '@vueuse/integrations/useCookies'
const cookie = useCookies()

const token = ref('')

function get() {
  token.value = cookie.get('admin-token')
  console.log(cookie.get('admin-token'))
}

function clear() {
  cookie.remove('admin-token')
}
</script>
