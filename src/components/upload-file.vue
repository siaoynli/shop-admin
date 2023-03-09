<template>
  <el-upload
    accept="image/jpg,image/png,image/jpeg"
    drag
    :action="uploadImageAction"
    multiple
    :headers="{ token }"
    name="img"
    :before-upload="beforeUpload"
    :data="data"
    :on-success="uploadSuccess"
    :on-error="uploadError"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">拖拽文件 <em>点击上传</em></div>
    <template #tip>
      <div class="el-upload__tip">文件大小限制3MB</div>
    </template>
  </el-upload>
</template>
<script setup>
import { uploadImageAction } from '~/api/image.js'
import { getToken } from '~/composables/auth'
import { toast } from '~/composables/utils'

const token = getToken()

const emit = defineEmits(['success'])

const uploadSuccess = (response, uploadFile, uploadFiles) => {
  emit('success', { response, uploadFile, uploadFiles })
}
const uploadError = (error, uploadFile, uploadFiles) => {
  const msg = JSON.parse(error.message).msg || '上传失败'
  toast(msg, 'error')
}

const beforeUpload = rawFile => {
  console.log(rawFile)

  const fileTypeArray = ['image/png', 'image/jpg', 'image/jpeg']
  if (fileTypeArray.indexOf(rawFile.type) === -1) {
    toast('图片仅支持jpg、jpeg、png格式', 'error')
    return false
  }

  if (rawFile.size / (1024 * 1024) > 3) {
    toast('图片大小不能超过3M', 'error')
    return false
  }

  const width = 800
  const height = 800
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.onload = function (event) {
      var txt = event.target.result
      var img = document.createElement('img')
      img.src = txt
      img.onload = function () {
        const valid = img.width <= width && img.height <= height
        if (!valid) {
          toast(`图片尺寸超过${width}*${height}`, 'error')
          return reject(false)
        }
        resolve()
      }
    }
    reader.readAsDataURL(rawFile)
  })
}

defineProps({
  data: {
    type: Object,
    default: null
  }
})
</script>

<style scoped lang="postcss">
.el-upload__tip {
  @apply text-orange-500 text-sm py-2;
}
</style>
