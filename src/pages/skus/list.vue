<template>
  <div>
    <el-card class="border-0" shadow="never">
      <list-header
        show-delete-btn
        @create="handleCreate"
        @refresh="getData"
        @delete="handleDeleteAll"
      ></list-header>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="规格名称" width="180" />
        <el-table-column prop="default" label="规格值" />
        <el-table-column prop="order" label="排序" width="180" />
        <el-table-column label="状态" width="180">
          <template #default="{ row }">
            <el-switch
              :model-value="row.status"
              :active-value="1"
              :inactive-value="0"
              :loading="row.statusLoading"
              :disabled="row.super == 1"
              @change="val => handleChangeStatus(val, row)"
            />
          </template>
        </el-table-column>
        <el-table-column align="right" label="操作" width="180">
          <template #default="{ row }">
            <el-button size="small" link @click="handleEdit(row)"
              >编辑</el-button
            >
            <span class="pl-2" @click.stop="() => {}">
              <el-popconfirm
                title="确定要删除这条记录吗?"
                confirm-button-text="是"
                cancel-button-text="否"
                width="220"
                @confirm="handleDelete([row.id])"
              >
                <template #reference>
                  <el-button size="small" link type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-center p-3">
        <el-pagination
          background
          layout="prev,pager, next"
          :total="totalCount"
          :current-page="currentPage"
          :page-size="limit"
          hide-on-single-page
          @current-change="getData"
        />
      </div>
    </el-card>

    <form-drawer
      ref="formDrawerRef"
      :title="drawerTitle"
      destroy-on-close
      @submit="handleSubmit"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :inline="false"
        label-width="150px"
      >
        <el-form-item prop="name" label="规格名称">
          <el-input v-model="form.name" placeholder="" />
        </el-form-item>
        <el-form-item prop="order" label="排序">
          <el-input-number v-model="form.order" :min="1" :max="10000" />
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item prop="default" label="规格值">
          <tag-input v-model="form.default" />
        </el-form-item>
      </el-form>
    </form-drawer>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { toast, showModal } from '~/composables/utils'
import {
  getSkusList,
  deleteSkus,
  createSkus,
  updateSkus,
  updateSkusStatus
} from '~/api/skus'

import FormDrawer from '~/components/form-drawer.vue'
import ListHeader from '~/components/list-header.vue'
import TagInput from '~/components/tag-input.vue'
import { useInitTable, useInitForm } from '~/hooks/useCommon.js'

const {
  tableData,
  loading,
  totalCount,
  currentPage,
  limit,
  getData,
  handleDelete,
  handleChangeStatus
} = useInitTable({
  onGetListSuccess: res => {
    tableData.value = res.list.map(o => {
      o.statusLoading = false
      return o
    })
    totalCount.value = res.totalCount
  },
  getList: getSkusList,
  delete: deleteSkus,
  updateStatus: updateSkusStatus
})

const {
  formDrawerRef,
  drawerTitle,
  formRef,
  rules,
  form,
  handleCreate,
  handleEdit,
  handleSubmit
} = useInitForm({
  form: {
    name: '',
    default: '',
    order: 1,
    status: 0
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入规格名称',
        trigger: 'blur'
      }
    ]
  },
  getData: getData,
  create: createSkus,
  update: updateSkus
})

const selectIds = ref([])

const handleSelectionChange = rows => {
  selectIds.value = rows.map(o => o.id)
}

const handleDeleteAll = () => {
  if (selectIds.value.length == 0) {
    toast('请选择要删除的记录', 'error')
    return
  }
  showModal('您确认要删除这些记录吗?')
    .then(() => {
      handleDelete(selectIds.value)
    })
    .catch(() => {})
}
</script>
