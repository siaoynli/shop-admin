<template>
  <el-aside width="220px" class="image-aside">
    <div class="top">
      <aside-list active @edit="handleEdit" @delete="handleDelete">
        标题1
      </aside-list>
      <aside-list @edit="handleEdit" @delete="handleDelete"> 标题2 </aside-list>
    </div>
    <div class="bottom"></div>
  </el-aside>
</template>

<script setup>
import AsideList from '~/components/aside-list.vue'

const handleEdit = () => {
  console.log('handleEdit')
}

const handleDelete = () => {
  console.log('handleDelete')
}
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
