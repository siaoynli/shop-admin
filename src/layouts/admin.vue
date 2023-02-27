<template>
  <el-container>
    <el-header>
      <f-header></f-header>
    </el-header>
    <el-container>
      <el-aside> <f-menu></f-menu></el-aside>
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
