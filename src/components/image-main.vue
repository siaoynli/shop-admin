<template>
  <div>
    <el-main class="image-main">
      <div class="top"></div>
      <div class="bottom"></div>
    </el-main>
  </div>
</template>

<style scoped lang="postcss">
.image-main {
  position: relative;
}

.image-main .top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.image-main .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex   justify-center items-center;
}
</style>
