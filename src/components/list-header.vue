<template>
  <div class="flex justify-between items-center">
    <div class="pb-3">
      <el-button type="primary" class="text-gray-200" @click="$emit('create')"
        >新增</el-button
      >
      <el-button
        v-if="showDeleteBtn"
        type="danger"
        class="text-gray-200"
        @click="$emit('delete')"
        >批量删除</el-button
      >
    </div>

    <el-tooltip effect="dark" content="刷新数据" placement="top">
      <el-icon class="cursor-pointer" @click="$emit('refresh')"
        ><Refresh
      /></el-icon>
    </el-tooltip>
  </div>
</template>
<script setup>
defineProps({
  showDeleteBtn: {
    type: Boolean,
    default: false
  }
})
defineEmits(['create', 'refresh', 'delete'])
</script>
