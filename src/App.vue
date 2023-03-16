<template>
  <router-view></router-view>
</template>
<script lang="ts">
console.log(
  ' %c 杭州网版权所有 %c  © 西瓜哥  https://www.hangzhou.com.cn ',
  'color:#FFFFFB;background:#1890ff;padding:5px 0;border-radius:.5rem 0 0 .5rem;',
  'color:#FFFFFB;background:#080808;padding:5px 0;border-radius:0 .5rem .5rem 0;'
)
</script>

<style lang="postcss">
body {
  @apply bg-gray-100;
}
#nprogress .bar {
  background-color: #f57eed !important;
  height: 3px;
}

#nprogress .spinner-icon {
  border-top-color: #f57eed !important;
  border-left-color: #f57eed !important;
}

::-webkit-scrollbar {
  width: 8px;
  height: 6px;
}

/* 滚动条 */
::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded;
  border-right-color: transparent;
  border-left-color: transparent;
  border: 2px #fff solid;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-indigo-500;
}
/* 轨道 */
::-webkit-scrollbar-track {
  border-right-color: transparent;
  border-left-color: transparent;
  /* @apply bg-gray-100; */
}
</style>
