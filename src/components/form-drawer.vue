<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :size="size"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
  >
    <div class="form-drawer">
      <div class="body"><slot></slot></div>
      <div class="actions">
        <el-button type="default" @click="close">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleSubmit">{{
          confirmText
        }}</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
const showDrawer = ref(false)

const open = () => (showDrawer.value = true)
const close = () => (showDrawer.value = false)

const loading = ref(false)

const showLoading = () => (loading.value = true)
const hideLoading = () => (loading.value = false)
const clearValidate = () => (loading.value = false)

const emit = defineEmits(['submit'])
//通知外部组件submit事件
const handleSubmit = () => emit('submit')

defineProps({
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: '35%'
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: '确定'
  }
})

defineExpose({
  open,
  close,
  clearValidate,
  showLoading,
  hideLoading
})
</script>

<style lang="postcss" scoped>
.form-drawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}
.body {
  flex: 1;
  overflow-y: auto;
}

.actions {
  height: 50px;
  @apply mt-auto flex items-center justify-end;
}
</style>
