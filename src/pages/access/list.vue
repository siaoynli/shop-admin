<template>
  <div>
    <el-card class="border-0" shadow="never">
      <list-header @create="handleCreate" @refresh="getData"></list-header>
    </el-card>
  </div>
</template>
<script setup>
import ListHeader from '~/components/list-header.vue'
</script>

<style scoped lang="postcss"></style>
