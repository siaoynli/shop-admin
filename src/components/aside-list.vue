<template>
  <div class="aside-list" :class="{ active: active }">
    <span class="truncate"> <slot /> </span>
    <span>
      <el-button text type="primary" size="small" @click.stop="$emit('edit')"
        ><el-icon :size="12"><Edit /></el-icon
      ></el-button>

      <el-popconfirm
        title="确定要删除这条记录吗?"
        confirm-button-text="是"
        cancel-button-text="否"
        width="220"
        @confirm="$emit('delete')"
      >
        <template #reference>
          <el-button text type="primary" size="small" @click.stop=""
            ><el-icon :size="12"><Close /></el-icon
          ></el-button>
        </template>
      </el-popconfirm>
    </span>
  </div>
</template>
<script setup>
defineEmits(['edit', 'delete'])

defineProps({
  title: {
    type: String,
    default: ''
  },
  active: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped lang="postcss">
.aside-list {
  border-bottom: 1px solid #f4f4f4;
  @apply flex justify-between items-center p-3 text-sm text-gray-600 cursor-pointer;
}

.truncate {
  width: 130px;
  display: block;
}

.aside-list:hover,
.active {
  @apply bg-blue-50;
}

.aside-list .el-button {
  @apply mx-0 px-2;
}
</style>
