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
              <el-button type="primary" link>修改</el-button>
              <el-button type="primary" link>添加</el-button>
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
  </div>
</template>
<script setup>
import { ref } from 'vue'
import ListHeader from '~/components/list-header.vue'
import { getRuleList, deleteRule, updateManagerStatus } from '~/api/rule'

import { useInitTable, useInitForm } from '~/hooks/useCommon'

const defaultProps = {
  children: 'child',
  label: 'name'
}

const defaultExpandedKeys = ref([])

const { tableData, loading, getData, handleDelete, handleChangeStatus } =
  useInitTable({
    getList: getRuleList,
    onGetListSuccess: res => {
      tableData.value = res.list.map(o => {
        o.statusLoading = false
        return o
      })
      defaultExpandedKeys.value = res.list.map(o => o.id)
    },
    delete: deleteRule,
    updateStatus: updateManagerStatus
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
} = useInitForm()
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
