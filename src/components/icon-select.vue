<template>
  <div class="flex items-center">
    <el-icon v-if="modelValue" :size="20" class="mr-2">
      <component :is="modelValue"></component>
    </el-icon>
    <el-select
      :model-value="modelValue"
      placeholder="请选择图标"
      filterable
      @change="handleChange"
    >
      <el-option v-for="item in icons" :key="item" :label="item" :value="item">
        <div class="flex items-center justify-between">
          <el-icon :size="18"> <component :is="item"></component></el-icon>
          <span class="text-gray-500">{{ item }}</span>
        </div>
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import * as iconsList from '@element-plus/icons-vue'

const icons = ref(Object.keys(iconsList))

defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const handleChange = value => {
  emit('update:modelValue', value)
}
</script>
<style scoped lang="postcss"></style>
