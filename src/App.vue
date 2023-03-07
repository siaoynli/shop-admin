<template>
  <router-view></router-view>
</template>

<style>
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
