<template lang="">
  <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
    <el-tabs
      v-model="activeTab"
      type="card"
      class="flex-1"
      style="min-width: 100px"
      @tab-remove="removeTab"
      @tab-change="changeTab"
    >
      <el-tab-pane
        v-for="item in tabList"
        :key="item.path"
        :label="item.title"
        :name="item.path"
        :closable="item.path !== '/'"
      >
      </el-tab-pane>
    </el-tabs>
    <span class="tag-btn">
      <el-dropdown trigger="click" @command="handleClose">
        <span class="el-dropdown-link">
          <el-icon>
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOther"
              >关闭其他标签</el-dropdown-item
            >
            <el-dropdown-item command="closeAll">关闭全部标签</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown></span
    >
  </div>

  <div class="h-[44px]"></div>
</template>

<script setup>
import { useTabList } from '~/composables/useTabList'

const { activeTab, tabList, changeTab, removeTab, handleClose } = useTabList()
</script>

<style scoped lang="postcss">
.f-tag-list {
  @apply fixed bg-gray-100 flex items-center  px-2;
  top: 64px;
  right: 0;
  height: 44px;
  z-index: 100;
}

.tag-btn {
  @apply bg-light-50 rounded ml-auto flex justify-center items-center;
  height: 32px;
  width: 32px;
}

:deep(.el-tabs__header) {
  @apply mb-0 mt-2;
}

:deep(.el-tabs__nav),
:deep(.el-tabs__header) {
  border: 0 !important;
}

:deep(.el-tabs__item) {
  border: 0 !important;
  @apply bg-white mx-1 rounded;
  height: 32px;
  line-height: 32px;
}
:deep(.el-tabs__nav-prev),
:deep(.el-tabs__nav-next) {
  height: 32px !important;
  line-height: 32px;
}
:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>
