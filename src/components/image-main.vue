<template>
  <el-main v-loading="loading" class="image-main">
    <div class="top p-3">
      <el-row :gutter="10">
        <el-col v-for="(item, index) in dataList" :key="index" :span="4">
          <el-card
            shadow="hover"
            class="relative mb-3"
            :body-style="{ padding: 0 }"
          >
            <el-image
              :src="item.url"
              fit="cover"
              :zoom-rate="1.2"
              :preview-src-list="[item.url]"
              :initial-index="0"
              :lazy="true"
              class="w-full h-[150px]"
              ><template #error>
                <div class="image-slot">
                  <el-icon><Picture /></el-icon>
                </div> </template
            ></el-image>
            <div class="image-title">{{ item.name }}</div>
            <div class="flex justify-center items-center p-2">
              <el-button text type="primary" @click="handleEdit(item)"
                >修改</el-button
              >
              <el-popconfirm
                width="220"
                confirm-button-text="是"
                cancel-button-text="否"
                title="确定要删除这张图片吗?"
                @confirm="handleDelete(item.id)"
              >
                <template #reference>
                  <el-button text type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev,pager, next"
        :total="totalCount"
        :current-page="current_page"
        :page-size="limit"
        hide-on-single-page
        @current-change="getData"
      />
    </div>
  </el-main>
</template>
<script setup>
import { ref } from 'vue'
import { getImageList, deleteImages, updateImage } from '~/api/image'
import { toast, showPrompt } from '~/composables/utils'

const current_page = ref(1)
const totalCount = ref(0)
const dataList = ref([])
const loading = ref(false)
const classId = ref(0)
const limit = ref(18)

const getData = (p = 1) => {
  current_page.value = p
  loading.value = true
  getImageList(classId.value, current_page.value, limit.value)
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

const rename = (id, name) => {
  let arr = []
  dataList.value.forEach(item => {
    if (item.id == id) {
      item.name = name
    }
    arr.push(item)
  })
  dataList.value = arr
}

const handleEdit = ({ id, name }) => {
  showPrompt('请输入图片名称', name)
    .then(({ value }) => {
      loading.value = true
      updateImage(id, value)
        .then(() => {
          toast('操作成功')
          rename(id, value)
        })
        .finally(() => {
          loading.value = false
        })
    })
    .catch(() => {})
}

const handleDelete = id => {
  loading.value = true
  deleteImages([id])
    .then(() => {
      toast('操作成功')
      getData(current_page.value)
    })
    .finally(() => {
      loading.value = false
    })
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

.image-title {
  position: absolute;
  z-index: 9;
  top: 122px;
  left: 0;
  right: 0;
  @apply text-gray-100 text-sm py-1 px-3 bg-gray-800 bg-opacity-50 truncate;
}

.image-main .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 30px;
  @apply bg-gray-100 text-gray-500;
}
.image-main .image-slot .el-icon {
  font-size: 30px;
}
</style>
