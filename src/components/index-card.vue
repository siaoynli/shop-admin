<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="flex justify-between">
          <span>{{ title }}</span>
          <el-tag type="danger" effect="plain">{{ tips }}</el-tag>
        </div>
      </template>

      <el-row :gutter="20">
        <el-col
          v-for="(item, index) in buttons"
          :key="index"
          :span="6"
          :offset="0"
        >
          <el-card shadow="hover" class="bg-gray-100 border-0 py-5">
            <div
              class="flex flex-col justify-center items-center cursor-pointer"
            >
              <span class="text-xl font-bold text-gray-400">{{
                item.value
              }}</span>
              <span class="text-2xs text-gray-500 mt-2">{{ item.label }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  tips: { type: String, default: '' },
  buttons: {
    type: Array,
    default: () => []
  }
})
</script>
