<template>
  <el-container>
    <el-header>
      <f-header></f-header>
    </el-header>
    <el-container>
      <el-aside :width="$store.state.asideWidth"> <f-menu></f-menu></el-aside>
      <el-main>
        <tag-list></tag-list>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup>
import FHeader from './header.vue'
import FMenu from './menu.vue'
import TagList from './taglist.vue'
</script>

<style scoped lang="postcss">
.el-aside {
  transition: all 200ms;
}
.el-main {
  height: calc(100vh - 64px);
}
</style>
