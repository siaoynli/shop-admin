<template>
  <div class="flex items-center">
    <el-popconfirm
      v-if="modelValue"
      title="确定要删除吗?"
      confirm-button-text="是"
      cancel-button-text="否"
      @confirm="handleDelete()"
    >
      <template #reference>
        <el-image
          style="width: 100px; height: 100px"
          :src="modelValue"
          fit="cover"
          class="mr-2 cursor-pointer"
        />
      </template>
    </el-popconfirm>

    <div class="choose-container" @click="open">
      <el-icon :size="25"><Plus /></el-icon>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="选择图片"
    width="80%"
    destroy-on-close
  >
    <el-container class="bg-white rounded" style="height: 50vh">
      <el-header class="image-header">
        <el-button type="primary" @click="handleCreate">新增图片分类</el-button>
        <el-button type="warning" @click="handleUpload">上传图片</el-button>
      </el-header>
      <el-container>
        <image-aside ref="imageAsideRef" @change="handleChange" />
        <image-main ref="imageMainRef" open-choose @choose="handleChoose" />
      </el-container>
    </el-container>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleOk"> 确定 </el-button>
        <el-button @click="close">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import ImageAside from '~/components/image-aside.vue'
import ImageMain from '~/components/image-main.vue'

const dialogVisible = ref(false)
let imageUrls = []

const open = () => (dialogVisible.value = true)
const close = () => (dialogVisible.value = false)

const imageAsideRef = ref(null)
const imageMainRef = ref(null)

const handleCreate = () => {
  imageAsideRef.value.handleCreate()
}
const handleChange = id => imageMainRef.value.loadData(id)

const handleUpload = () => imageMainRef.value.openUploadDrawer()

const handleChoose = items => {
  imageUrls = items.map(o => o.url)
}

defineProps({
  modelValue: {
    type: [String, Array],
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const handleOk = () => {
  emit('update:modelValue', imageUrls[0])
  close()
}

const handleDelete = () => {
  emit('update:modelValue', '')
}
</script>

<style lang="postcss" scoped>
.choose-container {
  @apply flex w-[100px] h-[100px] border bg-gray-200 justify-center items-center rounded text-gray-500 cursor-pointer hover:(bg-gray-100);
}
</style>
