<template lang="">
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      unique-opened
      default-active="2"
      class="border-0"
      :collapse-transition="false"
      :collapse="isCollapse"
      @select="handleSelect"
    >
      <template v-for="(item, index) in asideMenus" :key="index">
        <el-sub-menu v-if="item.child && item.child.length" :index="item.name">
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
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const isCollapse = computed(() => !(store.state.asideWidth == '250px'))
const router = useRouter()
const asideMenus = [
  {
    name: '欢迎使用后台管理系统',
    icon: 'switch-filled',
    frontpath: 'http://www.hangzhou.com.cn'
  },
  {
    name: '后台面板',
    icon: 'help',
    child: [
      {
        name: '主控台',
        frontpath: '/',
        icon: 'home-filled'
      }
    ]
  },
  {
    name: '商城管理',
    icon: 'shopping-bag',
    child: [
      {
        name: '商品管理',
        frontpath: '/goods/list',
        icon: 'shopping-cart-full'
      }
    ]
  }
]

const handleSelect = e => {
  if (e.indexOf('http') !== -1) {
    window.open(e)
    return
  }
  router.push(e)
}
</script>

<style scoped lang="postcss">
.f-menu {
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 200ms;
  @apply shadow-md fixed bg-light-50;
}
</style>
