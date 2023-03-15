<template>
  <div>
    <el-card class="border-0" shadow="never">
      <div class="">
        <div class="flex justify-end items-center">
          <el-form :model="searchForm" :inline="false">
            <span class="text-sm text-gray-600 mr-3">关键词</span>
            <el-input
              v-model="searchForm.keyword"
              class="w-50 mr-3"
              placeholder="请输入管理员昵称"
              :prefix-icon="Search"
              clearable
            /><el-button
              type="primary"
              :disabled="searchForm.keyword == ''"
              @click="getData()"
              >搜索</el-button
            >
            <el-button
              :disabled="searchForm.keyword == ''"
              @click="resetSearchForm"
              >重置</el-button
            >
          </el-form>
        </div>
        <div class="flex justify-between items-center">
          <div class="pb-3">
            <el-button
              type="primary"
              class="text-gray-200"
              @click="handleCreate"
              >新增</el-button
            >
          </div>
          <el-tooltip effect="dark" content="刷新数据" placement="top">
            <el-icon class="cursor-pointer" @click="getData()"
              ><Refresh
            /></el-icon>
          </el-tooltip>
        </div>
      </div>
      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column label="管理员">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-avatar v-if="row.avatar" :size="40" :src="row.avatar" />
              <el-avatar v-else :size="40" :icon="UserFilled" />

              <div class="ml-3 flex flex-col">
                <span> {{ row.username }}</span>
                <span> ID:{{ row.id }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="role.name" label="管理员" align="center" />

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
        <el-table-column prop="create_time" label="创建时间" width="180" />
        <el-table-column align="right" label="操作" width="180">
          <template #default="{ row }">
            <template v-if="!row.super">
              <el-button size="small" @click="handleEdit(row)">编辑</el-button>
              <span class="pl-2" @click.stop="() => {}">
                <el-popconfirm
                  title="确定要删除这条记录吗?"
                  confirm-button-text="是"
                  cancel-button-text="否"
                  width="220"
                  @confirm="handleDelete(row.id)"
                >
                  <template #reference>
                    <el-button size="small" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </span>
            </template>
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
      <el-form ref="formRef" :model="form" :inline="false" label-width="150px">
        <el-form-item
          prop="username"
          label="用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <el-input v-model.trim="form.username" placeholder="" />
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          :rules="[
            { required: editId == 0, message: '请输入密码' },
            { validator: validatePassword, trigger: 'change' }
          ]"
        >
          <el-input
            v-model.trim="form.password"
            placeholder=""
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item
          prop="repassword"
          label="确认密码"
          :rules="[
            { required: editId == 0, message: '请输入确认密码' },
            { validator: validateRePassword, trigger: 'change' }
          ]"
        >
          <el-input
            v-model.trim="form.repassword"
            placeholder=""
            type="password"
            show-password
          />
        </el-form-item>

        <el-form-item prop="avatar" label="选择头像">
          <choose-image v-model="form.avatar" />
        </el-form-item>
        <el-form-item prop="role_id" label="所属角色">
          <el-select v-model="form.role_id" placeholder="选择所属角色">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
import { ref } from 'vue'
import { UserFilled, Search } from '@element-plus/icons-vue'
import {
  createManager,
  updateManager,
  getManagerList,
  deleteManager,
  updateManagerStatus
} from '~/api/manager'
import FormDrawer from '~/components/form-drawer.vue'
import ChooseImage from '~/components/choose-image.vue'

import { useInitTable, useInitForm } from '~/hooks/useCommon.js'
import { useValidator } from '~/hooks/useValidator.js'

const roles = ref([])

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  totalCount,
  limit,
  getData,
  handleDelete,
  handleChangeStatus
} = useInitTable({
  searchForm: { keyword: '' },
  getList: getManagerList,
  onGetListSuccess: res => {
    tableData.value = res.list.map(o => {
      o.statusLoading = false
      return o
    })
    roles.value = res.roles
    totalCount.value = res.totalCount
  },
  delete: deleteManager,
  updateStatus: updateManagerStatus
})

const {
  formDrawerRef,
  drawerTitle,
  formRef,
  form,
  editId,
  handleCreate,
  handleEdit,
  handleSubmit
} = useInitForm({
  form: {
    username: '',
    password: '',
    repassword: '',
    role_id: null,
    status: 1,
    avatar: ''
  },
  create: createManager,
  update: updateManager,
  getData
})

const { validatePassword, validateRePassword } = useValidator({
  password: form.password
})
</script>
