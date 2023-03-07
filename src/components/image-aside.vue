<template>
  <el-aside v-loading="loading" width="220px" class="image-aside">
    <div class="top">
      <aside-list
        v-for="(item, index) in imageClasses"
        :key="index"
        :active="activeId == item.id"
        @edit="handleEdit"
        @delete="handleDelete"
      >
        {{ item.name }}
      </aside-list>
    </div>
    <div class="bottom"></div>
  </el-aside>
</template>

<script setup>
import { ref } from 'vue'
import { getImageClassList } from '~/api/image'
import AsideList from '~/components/aside-list.vue'

const loading = ref(false)
const page = ref(1)
const imageClasses = ref([])
const activeId = ref(0)

function getData() {
  loading.value = true
  getImageClassList(page.value)
    .then(res => {
      imageClasses.value = res.list
      activeId.value = imageClasses.value[0] ? imageClasses.value[0].id : 0
    })
    .finally(() => {
      loading.value = false
    })
}

getData()
const handleEdit = () => {
  console.log('handleEdit')
}

const handleDelete = () => {
  console.log('handleDelete')
}
</script>

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
