<template>
  <div>
    <el-container class="bg-white rounded" :style="{ height: height + 'px' }">
      <el-header class="image-header">Header</el-header>
      <el-container>
        <image-aside />
        <image-main />
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import ImageAside from '~/components/image-aside.vue'
import ImageMain from '~/components/image-main.vue'

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
</style>
