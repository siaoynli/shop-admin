<template>
  <el-main v-loading="loading" class="image-main">
    <div class="top"></div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="totalCount"
        @current-change="getData"
      />
    </div>
  </el-main>
</template>
<script setup>
import { ref } from 'vue'
import { getImageList } from '~/api/image'

const current_page = ref(1)
const totalCount = ref(0)
const dataList = ref([])
const loading = ref(false)
const classId = ref(0)

const getData = (p = 1) => {
  current_page.value = p
  loading.value = true
  getImageList(classId.value, current_page.value)
    .then(res => {
      dataList.value = res.list
      totalCount.value = res.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}

//根据分类id加载图片列表
const loadData = id => {
  current_page.value = 1
  classId.value = id
  getData()
}

defineExpose({
  loadData
})
</script>

<style scoped lang="postcss">
.image-main {
  position: relative;
}

.image-main .top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex   justify-center items-center;
}
</style>
