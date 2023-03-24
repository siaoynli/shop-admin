<template>
  <div>
    <el-card class="border-0" shadow="never">
      <list-header
        layout="create,delete,refresh"
        :multi-selection-ids="multiSelectionIds"
        @create="handleCreate"
        @refresh="getData"
        @delete="handleMultiDelete"
      ></list-header>
      <el-table
        ref="multipleTableRef"
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" label="规格名称" width="180" />
        <el-table-column label="规格值">
          <template #default="{ row }">
            <el-tag v-for="tag in row.tags" :key="tag" class="mx-1">{{
              tag
            }}</el-tag>
          </template>
        </el-table-column>
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
  handleChangeStatus,
  multiSelectionIds,
  handleSelectionChange,
  multipleTableRef,
  handleMultiDelete
} = useInitTable({
  onGetListSuccess: res => {
    tableData.value = res.list.map(o => {
      o.statusLoading = false
      o.tags = o.default.split(',')
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
</script>
