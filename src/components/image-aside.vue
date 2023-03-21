<template>
  <el-aside v-loading="loading" width="220px" class="image-aside">
    <div class="top">
      <el-scrollbar>
        <aside-list
          v-for="(item, index) in tableData"
          :key="index"
          :active="activeId == item.id"
          @edit="handleEdit(item)"
          @delete="handleDelete(item.id)"
          @click="handleChangeActiveId(item.id)"
        >
          {{ item.name }}
        </aside-list>
      </el-scrollbar>
    </div>

    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="totalCount"
        hide-on-single-page
        @current-change="getData"
      />
    </div>
  </el-aside>

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
      <el-form-item prop="name" label="分类标题">
        <el-input v-model="form.name" placeholder="" />
      </el-form-item>
      <el-form-item prop="order" label="排序">
        <el-input-number v-model="form.order" :min="1" :max="10000" />
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import { ref } from 'vue'
import AsideList from '~/components/aside-list.vue'
import FormDrawer from './form-drawer.vue'

import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass
} from '~/api/image'

import { useInitTable, useInitForm } from '~/hooks/useCommon.js'

const activeId = ref(0)

const { tableData, loading, totalCount, getData, handleDelete } = useInitTable({
  getList: getImageClassList,
  delete: deleteImageClass,
  onGetListSuccess: res => {
    activeId.value = res.list[0].id
    emit('change', res.list[0].id)
  }
})

const {
  formDrawerRef,
  drawerTitle,
  formRef,
  form,
  rules,
  handleCreate,
  handleEdit,
  handleSubmit
} = useInitForm({
  form: {
    name: '',
    order: 1
  },
  rules: {
    name: [
      {
        required: true,
        message: '请输入分类标题',
        trigger: 'blur'
      }
    ],
    order: [
      {
        required: true,
        message: '请选择排序',
        trigger: 'blur'
      }
    ]
  },
  create: createImageClass,
  update: updateImageClass,
  getData
})

const emit = defineEmits(['change'])

//点击触事件
const handleChangeActiveId = id => {
  activeId.value = id
  //将id传递到父组件方法中
  emit('change', id)
}

defineExpose({
  handleCreate
})
</script>

<style scoped lang="postcss">
.image-aside {
  border-right: 1px #eee solid;
  position: relative;
  height: 100%;
}

.image-aside .top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex   justify-center items-center;
}

.el-form-item {
  margin-bottom: 18px !important;
}
</style>
