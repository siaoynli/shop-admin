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

*::-webkit-scrollbar-thumb {
  background-color: #ccc;
  height: 50px;
  outline-offset: -2px;
  outline: 2px solid #fff;
  -webkit-border-radius: 4px;
  border: 2px solid #fff;
}

*::-webkit-scrollbar-thumb:hover {
  height: 50px;
  -webkit-border-radius: 4px;
  @apply bg-indigo-500;
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

*::-webkit-scrollbar-track-piece {
  @apply bg-light-100;
  -webkit-border-radius: 0;
}

*::-webkit-scrollbar-thumb:active {
  height: 50px;
  @apply bg-indigo-500;
  -webkit-border-radius: 4px;
}
</style>
