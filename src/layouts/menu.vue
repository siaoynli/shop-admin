<template lang="">
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-scrollbar>
      <el-menu
        class="border-0"
        :collapse-transition="false"
        :collapse="isCollapse"
        :default-active="defaultActive"
        @select="handleSelect"
      >
        <template v-for="(item, index) in asideMenus" :key="index">
          <el-sub-menu
            v-if="item.child && item.child.length"
            :index="item.name"
          >
            <template #title>
              <el-icon><component :is="item.icon"></component></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="(_item, _index) in item.child"
              :key="_index"
              :index="_item.frontpath"
            >
              <el-icon><component :is="_item.icon"></component></el-icon>
              <span> {{ _item.name }}</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="item.frontpath">
            <el-icon><component :is="item.icon"></component></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()

const defaultActive = ref(route.path)
const isCollapse = computed(() => !(store.state.asideWidth == '250px'))

const asideMenus = computed(() => store.state.menus)

const handleSelect = e => {
  if (e.indexOf('http') !== -1) {
    window.open(e)
    return
  }
  defaultActive.value = e
  router.push(e)
}

onBeforeRouteUpdate(to => {
  defaultActive.value = to.path
})
</script>

<style scoped lang="postcss">
.f-menu {
  top: 64px;
  bottom: 0;
  left: 0;
  @apply shadow-md fixed bg-light-50;
}
</style>
