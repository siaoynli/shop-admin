<template>
  <el-container>
    <el-header>
      <f-header></f-header>
    </el-header>
    <el-container>
      <el-aside :width="$store.state.asideWidth"> <f-menu></f-menu></el-aside>
      <el-main>
        <tag-list></tag-list>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <keep-alive :max="10">
              <component :is="Component"></component
            ></keep-alive>
          </transition>
        </router-view>
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
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 200ms;
}

.fade-enter-active {
  transition-delay: 200ms;
}
</style>
