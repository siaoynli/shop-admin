<template>
  <div>
    <el-container class="bg-white rounded" :style="{ height: height + 'px' }">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'

const height = ref(0)
const resize = () => {
  const windowHeight = window.innerHeight || document.body.clientHeight
  height.value = windowHeight - 64 - 44 - 40
}

onMounted(() => {
  resize()
  window.addEventListener('resize', () => resize())
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => resize())
})
</script>
