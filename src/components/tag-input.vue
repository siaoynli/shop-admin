<template>
  <div>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      class="mx-1"
      size="large"
      closable
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputTag"
      class="ml-1 w-20"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag ml-1" @click="showInput">
      + 添加值
    </el-button>
  </div>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import { toast } from '~/composables/utils'

const inputVisible = ref(false)
const InputRef = ref('')
const inputTag = ref('')

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const dynamicTags = ref(props.modelValue ? props.modelValue.split(',') : [])

const emit = defineEmits(['update:modelValue'])

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputTag.value) {
    dynamicTags.value.push(inputTag.value)
    emit('update:modelValue', dynamicTags.value.join(','))
  }
  inputTag.value = ''
  inputVisible.value = false
}

const handleClose = tag => {
  dynamicTags.value = dynamicTags.value.filter(o => o != tag)
  emit('update:modelValue', dynamicTags.value.join(','))
}
</script>
<style scoped lang="postcss"></style>
