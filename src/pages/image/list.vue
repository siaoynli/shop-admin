<template>
  <div>
    <el-container class="bg-white rounded" :style="{ height: height + 'px' }">
      <el-header class="image-header">Header</el-header>
      <el-container>
        <el-aside width="220px" class="image-aside">
          <div class="top">
            <div v-for="i in 100" :key="i">{{ i }}</div>
          </div>
          <div class="bottom"></div>
        </el-aside>
        <el-main class="image-main">
          <div class="top"></div>
          <div class="bottom"></div>
        </el-main>
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
<style scoped lang="postcss">
.image-header {
  @apply flex items-center;
  border-bottom: 1px #eee solid;
}

.image-aside {
  border-right: 1px #eee solid;
  position: relative;
}

.image-main {
  position: relative;
}
.image-aside .top,
.image-main .top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom,
.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex   justify-center items-center;
}
</style>
