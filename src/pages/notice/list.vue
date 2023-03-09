<template>
  <el-card class="border-0" shadow="never">
    <div class="flex justify-between items-center">
      <div class="pb-3">
        <el-button type="primary" size="small" class="text-gray-200"
          >新增</el-button
        >
      </div>
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-icon class="cursor-pointer" @click="handleRefresh"
          ><Refresh
        /></el-icon>
      </el-tooltip>
    </div>
    <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="create_time" label="发布时间" width="180" />
      <el-table-column align="right" label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev,pager, next"
      :total="totalCount"
      :current-page="current_page"
      hide-on-single-page
      @current-change="getData"
    />
  </el-card>
</template>
<script setup>
import { ref } from 'vue'
import { getNoticeList, deleteNotice } from '~/api/notice'
import { toast } from '~/composables/utils'

const tableData = ref([])
const totalCount = ref(0)
const current_page = ref(1)
const loading = ref(false)

function getData(p = 1) {
  current_page.value = p
  loading.value = true
  getNoticeList(current_page.value)
    .then(res => {
      tableData.value = res.list
      totalCount.value = res.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}
getData()

const handleRefresh = () => getData()

const handleDelete = (index, row) => {
  console.log('index', index)
  console.log('row', row)
  loading.value = true
  deleteNotice(row.id)
    .then(() => {
      toast('操作成功')
      getData(current_page.value)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
