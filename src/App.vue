<script setup></script>

<template>
  <button class="btn">按钮</button>
</template>

<style scoped>
.btn {
  @apply bg-purple-500 text-indigo-100 px-4 py-2 rounded transition-all duration-500 hover:( bg-purple-900) focus:(ring-8 ring-purple-900);
}
</style>
