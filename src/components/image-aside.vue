<template>
  <el-aside v-loading="loading" width="220px" class="image-aside">
    <div class="top">
      <aside-list
        v-for="(item, index) in imageClasses"
        :key="index"
        :active="activeId == item.id"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
      >
        {{ item.name }}
      </aside-list>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="totalCount"
        @current-change="getData"
      />
    </div>
  </el-aside>

  <form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
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
import AsideList from '~/components/aside-list.vue'
import FormDrawer from './form-drawer.vue'

import { useImageSide } from '~/hooks/useImageSide.js'

const {
  loading,
  imageClasses,
  activeId,
  totalCount,
  drawerTitle,
  formDrawerRef,
  form,
  formRef,
  rules,
  handleSubmit,
  handleCreate,
  handleEdit,
  handleDelete
} = useImageSide()

defineExpose({
  handleCreate
})
</script>

<style scoped lang="postcss">
.image-aside {
  border-right: 1px #eee solid;
  position: relative;
}

.image-aside .top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex   justify-center items-center;
}
</style>
