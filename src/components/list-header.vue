<template>
  <div class="flex justify-between items-center">
    <div class="pb-3">
      <el-button
        v-if="buttons.includes('create')"
        type="primary"
        class="text-gray-200"
        @click="$emit('create')"
        >新增</el-button
      >
      <el-popconfirm
        v-if="buttons.includes('delete')"
        title="是否删除选中的记录?"
        confirm-button-text="确认"
        cancel-button-text="取消"
        width="220"
        @confirm="$emit('delete')"
      >
        <template #reference>
          <el-button type="danger" class="text-gray-200" :disabled="disabled"
            >批量删除</el-button
          >
        </template>
      </el-popconfirm>
    </div>

    <el-tooltip
      v-if="buttons.includes('refresh')"
      effect="dark"
      content="刷新数据"
      placement="top"
    >
      <el-icon class="cursor-pointer" @click="$emit('refresh')"
        ><Refresh
      /></el-icon>
    </el-tooltip>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
  layout: {
    type: String,
    default: 'create,refresh'
  },
  multiSelectionIds: {
    type: Array,
    default: () => {
      return []
    }
  }
})

const disabled = computed(() => props.multiSelectionIds.length == 0)

const buttons = computed(() => props.layout.split(','))

defineEmits(['create', 'refresh', 'delete'])
</script>
