<template>
  <div>
    <el-card shadow="never" class="border-0">
      <template #header>
        <div class="flex justify-between items-center">
          <span>订单统计</span>
          <div>
            <el-check-tag
              v-for="(item, index) in options"
              :key="index"
              :checked="current == item.value"
              class="mr-2"
              @click="handleClick(item.value)"
              >{{ item.text }}</el-check-tag
            >
          </div>
        </div>
      </template>

      <div id="chart" ref="el" style="width: 100%; height: 300px"></div>
    </el-card>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { getStatistics3 } from '~/api/index.js'
import { useResizeObserver } from '@vueuse/core'
const current = ref('week')

const options = [
  {
    text: '近1个月',
    value: 'month'
  },
  {
    text: '近1周',
    value: 'week'
  },
  {
    text: '近24小时',
    value: 'hour'
  }
]

const handleClick = value => {
  current.value = value
  getData()
}

let myChart = null
let option = {
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}

// 在 mounted 之后通过 常量的 value 即可获取到 DOM 节点
onMounted(() => {
  // const chartDom = document.getElementById('chart')
  const chartDom = el.value
  myChart = echarts.init(chartDom)
  getData()
})

// 销毁 echarts，否则在此渲染会出现白屏
onBeforeUnmount(() => {
  if (myChart) {
    myChart.dispose()
  }
})

function getData() {
  myChart.showLoading()
  getStatistics3(current.value)
    .then(res => {
      option.xAxis.data = res.x
      option.series[0].data = res.y
      myChart.setOption(option)
    })
    .finally(() => {
      myChart.hideLoading()
    })
}
const el = ref(null)
//监听组件缩放，
useResizeObserver(el, () => myChart.resize())
</script>
