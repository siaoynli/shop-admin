<template>
  <div>
    <el-container class="bg-white rounded" :style="{ height: height + 'px' }">
      <el-header class="image-header">
        <el-button type="primary" @click="handleCreate">新增图片分类</el-button>
        <el-button type="warning">上传图片</el-button>
      </el-header>
      <el-container>
        <image-aside ref="imageAsideRef" @change="handleChange" />
        <image-main ref="imageMainRef" />
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

const imageAsideRef = ref(null)
const imageMainRef = ref(null)

const handleCreate = () => imageAsideRef.value.handleCreate()
const handleChange = id => imageMainRef.value.loadData(id)
</script>
<style scoped lang="postcss">
.image-header {
  @apply flex items-center;
  border-bottom: 1px #eee solid;
}
</style>
