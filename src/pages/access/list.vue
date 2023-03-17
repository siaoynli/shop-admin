<template>
  <div>
    <el-card class="border-0" shadow="never">
      <list-header @create="handleCreate" @refresh="getData"></list-header>
      <el-tree
        v-loading="loading"
        :data="tableData"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="defaultExpandedKeys"
        show-checkbox
      >
        <template #default="{ data }">
          <div class="tree-nodes">
            <el-tag size="small" :type="data.menu ? '' : 'info'">
              {{ data.menu == 1 ? '菜单' : '权限' }}</el-tag
            >
            <el-icon v-if="data.icon" :size="16" class="mr-2 ml-2">
              <component :is="data.icon"></component>
            </el-icon>
            <span>{{ data.name }}</span>

            <div class="ml-auto">
              <el-switch
                v-model="data.status"
                :active-value="1"
                :inactive-value="0"
                class="mr-5"
                :loading="data.statusLoading"
                @change="value => handleChangeStatus(value, data)"
              />
              <el-button type="primary" link @click.stop="handleEdit(data)"
                >修改</el-button
              >
              <el-button type="primary" link @click.stop="() => {}"
                >添加</el-button
              >
              <el-popconfirm
                title="确定要删除这条记录吗?"
                confirm-button-text="是"
                cancel-button-text="否"
                width="220"
                @confirm="handleDelete(data.id)"
              >
                <template #reference>
                  <el-button link type="danger" @click.stop="() => {}"
                    >删除</el-button
                  >
                </template>
              </el-popconfirm>
            </div>
          </div>
        </template>
      </el-tree>
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
        <el-form-item prop="role_id" label="上级菜单">
          <el-cascader
            v-model="form.role_id"
            :options="options"
            :props="{
              value: 'id',
              children: 'child',
              label: 'name',
              checkStrictly: true,
              emitPath: false
            }"
            clearable
            placeholder="请选择上级菜单"
          />
        </el-form-item>
        <el-form-item prop="menu" label="菜单/规则">
          <el-radio-group v-model="form.menu">
            <el-radio :label="1" border>菜单</el-radio>
            <el-radio :label="0" border>权限</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="name" label="菜单/权限名称">
          <el-input
            v-model="form.name"
            style="width: 50%"
            placeholder="请输入菜单/权限名称"
          />
        </el-form-item>
        <el-form-item v-if="form.menu == 1" prop="icon" label="菜单图标">
          <icon-select v-model="form.icon" />
        </el-form-item>
        <el-form-item
          v-if="form.menu == 1 && form.role_id > 1"
          prop="frontpath"
          label="前端路由"
        >
          <el-input v-model="form.frontpath" placeholder="请输入前端路由" />
        </el-form-item>
        <el-form-item v-if="form.menu == 0" prop="condition" label="后端规则">
          <el-input v-model="form.condition" placeholder="请输入后端规则" />
        </el-form-item>
        <el-form-item v-if="form.menu == 0" prop="method" label="请求方式">
          <el-select v-model="form.method" placeholder="请选择请求方式">
            <el-option
              v-for="item in ['GET', 'POST', 'PUT', 'DELETE']"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="order" label="排序">
          <el-input-number v-model="form.order" :min="1" :max="1000" />
        </el-form-item>
        <el-form-item prop="status" label="是否启用">
          <el-switch
            v-model="form.status"
            active-text="是"
            inactive-text="否"
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
import ListHeader from '~/components/list-header.vue'
import FormDrawer from '~/components/form-drawer.vue'
import IconSelect from '~/components/icon-select.vue'
import {
  getRuleList,
  createRule,
  updateRule,
  deleteRule,
  updateRuleStatus
} from '~/api/rule'

import { useInitTable, useInitForm } from '~/hooks/useCommon'

const defaultProps = {
  children: 'child',
  label: 'name'
}

const defaultExpandedKeys = ref([])
const options = ref([])

const { tableData, loading, getData, handleDelete, handleChangeStatus } =
  useInitTable({
    getList: getRuleList,
    onGetListSuccess: res => {
      tableData.value = res.list.map(o => {
        o.statusLoading = false
        return o
      })
      options.value = res.rules
      defaultExpandedKeys.value = res.list.map(o => o.id)
    },
    delete: deleteRule,
    updateStatus: updateRuleStatus
  })

const {
  editId,
  formDrawerRef,
  drawerTitle,
  form,
  rules,
  formRef,
  handleCreate,
  handleEdit,
  handleSubmit
} = useInitForm({
  form: {
    rule_id: 0,
    menu: 1,
    name: '',
    condition: '',
    method: 'GET',
    status: 1,
    order: 1,
    icon: '',
    frontpath: ''
  },
  rules: {},
  getData,
  create: createRule,
  update: updateRule
})
</script>

<style scoped lang="postcss">
.tree-nodes {
  flex: 1;
  display: flex;
  font-size: 14px;
  align-items: center;
  padding-right: 10px;
}
:deep(.el-tree-node__content) {
  padding: 15px 0;
}
</style>
