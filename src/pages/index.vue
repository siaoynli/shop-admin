<template>
  <div>后台首页</div>
  {{ store.user }}
</template>
<script setup>
import { useUserStore } from '~/stores/user'
const store = useUserStore()
</script>
