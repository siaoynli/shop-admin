<template>
  <div class="aside-list" :class="{ active: active }">
    <span class="truncate"> <slot /> </span>
    <span>
      <el-button text type="primary" size="small" @click="handleEdit"
        ><el-icon :size="12"><Edit /></el-icon
      ></el-button>

      <el-button text type="primary" size="small" @click="handleDelete"
        ><el-icon :size="12"><Close /></el-icon
      ></el-button>
    </span>
  </div>
</template>
<script setup>
const emit = defineEmits(['edit', 'delete'])

const handleEdit = () => emit('edit')
const handleDelete = () => emit('delete')

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
