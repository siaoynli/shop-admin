<template>
  <div>
    <el-row :gutter="20">
      <template v-if="panelsData.length == 0">
        <el-col v-for="o in 4" :key="o" :span="6" :offset="0">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%" />
                    <el-skeleton-item variant="text" style="width: 10%" />
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%" />
                <el-divider />
                <div class="flex justify-between text-sm text-gray-400">
                  <el-skeleton-item variant="text" style="width: 50%" />
                  <el-skeleton-item variant="text" style="width: 10%" />
                </div>
              </el-card>
            </template>
          </el-skeleton>
        </el-col>
      </template>
      <el-col
        v-for="(item, index) in panelsData"
        v-else
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
            <count-to :value="item.value"></count-to>
          </span>
          <el-divider />
          <div class="flex justify-between text-sm text-gray-400">
            <span>{{ item.subTitle }}</span>
            <span>{{ item.subValue }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <index-nav></index-nav>

    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <index-chart></index-chart>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import CountTo from '~/components/count-to.vue'
import IndexNav from '~/components/index-nav.vue'
import IndexChart from '~/components/index-chart.vue'
import { getStatistics1 } from '~/api/index'
const panelsData = ref([])
getStatistics1().then(({ panels }) => {
  panelsData.value = panels
  console.log(panelsData.value)
})
</script>
<style scoped lang="postcss"></style>
