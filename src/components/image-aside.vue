<template>
  <el-aside width="220px" class="image-aside">
    <div class="top">
      <div v-for="i in 100" :key="i">{{ i }}</div>
    </div>
    <div class="bottom"></div>
  </el-aside>
</template>

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
