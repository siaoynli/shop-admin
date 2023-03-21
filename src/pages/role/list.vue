<template>
  <div>
    <el-card class="border-0" shadow="never">
      <list-header @create="handleCreate" @refresh="getData"></list-header>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="name" label="角色名称" width="180" />
        <el-table-column prop="desc" label="角色描述" />
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
          <template #default="scope">
            <el-button size="small" link @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <span class="pl-2" @click.stop="() => {}">
              <el-popconfirm
                title="确定要删除这条记录吗?"
                confirm-button-text="是"
                cancel-button-text="否"
                width="220"
                @confirm="handleDelete(scope.row.id)"
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
      @submit="handleSubmit"
    >
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        :inline="false"
        label-width="150px"
      >
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="form.name" placeholder="" />
        </el-form-item>
        <el-form-item prop="desc" label="角色描述">
          <el-input v-model="form.desc" type="textarea" :rows="5" />
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
    </form-drawer>
  </div>
</template>
<script setup>
import {
  getRoleList,
  deleteRole,
  createRole,
  updateRole,
  updateRoleStatus
} from '~/api/role'

import FormDrawer from '~/components/form-drawer.vue'
import ListHeader from '~/components/list-header.vue'
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
  getList: getRoleList,
  delete: deleteRole,
  updateStatus: updateRoleStatus
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
    desc: '',
    status: 0
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入角色名称',
        trigger: 'blur'
      }
    ],
    desc: [
      {
        required: true,
        message: '请输入角色描述',
        trigger: 'blur'
      }
    ]
  },
  getData: getData,
  create: createRole,
  update: updateRole
})
</script>
