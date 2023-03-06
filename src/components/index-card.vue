<template>
  <div>
    <template v-if="buttons.length == 0">
      <el-skeleton style="width: 100%" animated loading>
        <template #template>
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="never">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>

                <el-row :gutter="20">
                  <el-col v-for="o in 4" :key="o" :span="6" :offset="0">
                    <el-card class="bg-gray-100 border-0 py-5">
                      <div
                        class="flex flex-col justify-center items-center cursor-pointer"
                      >
                        <el-skeleton-item variant="text" style="width: 20%" />
                        <el-skeleton-item
                          variant="text"
                          style="width: 20%"
                          class="mt-2"
                        />
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </el-card>
            </template>
          </el-skeleton>
        </template>
      </el-skeleton>
    </template>
    <el-card v-else shadow="never">
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
