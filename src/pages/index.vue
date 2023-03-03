<template>
  <div>
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in panelsData"
        :key="index"
        :span="6"
        :offset="0"
      >
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span class="text-sm">{{ item.title }}</span>
              <el-tag :type="item.unitColor">{{ item.unit }}</el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
            {{ item.value }}
          </span>
          <el-divider />
          <div class="flex justify-between text-sm text-gray-400">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getStatistics1 } from '~/api/index'
const panelsData = ref([])
getStatistics1().then(({ panels }) => {
  panelsData.value = panels
  console.log(panelsData.value)
})
</script>
<style scoped lang="postcss"></style>
