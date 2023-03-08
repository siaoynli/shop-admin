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
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="totalCount"
        @current-change="getData"
      />
    </div>
  </el-aside>

  <form-drawer ref="formDrawerRef" title="新增" @submit="handleSubmit">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :inline="false"
      label-width="150px"
    >
      <el-form-item prop="name" label="分类标题">
        <el-input v-model="form.name" placeholder="" />
      </el-form-item>
      <el-form-item prop="order" label="排序">
        <el-input-number v-model="form.order" :min="1" :max="1000" />
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getImageClassList } from '~/api/image'
import AsideList from '~/components/aside-list.vue'
import FormDrawer from './form-drawer.vue'

const loading = ref(false)

const imageClasses = ref([])
const activeId = ref(0)

const page = ref(1)
const totalCount = ref(0)

const getData = (p = 1) => {
  page.value = p
  loading.value = true
  getImageClassList(page.value)
    .then(res => {
      imageClasses.value = res.list
      totalCount.value = res.totalCount
      activeId.value = imageClasses.value[0] ? imageClasses.value[0].id : 0
    })
    .finally(() => {
      loading.value = false
    })
}

getData()

const formDrawerRef = ref(null)

const handleCreate = () => formDrawerRef.value.open()

const form = reactive({
  name: '',
  order: 50
})
const formRef = ref(null)

const rules = {
  name: [
    {
      required: true,
      message: '请输入分类标题',
      trigger: 'blur'
    }
  ],
  order: [
    {
      required: true,
      message: '请选择排序',
      trigger: 'blur'
    }
  ]
}

const handleSubmit = () => {
  formRef.value.validate(valid => {
    if (!valid) {
      return false
    }
    formDrawerRef.value.showLoading()
    // updatePassword(form)
    //   .then(() => {
    //     toast('修改密码成功，请重新登陆')
    //     store.dispatch('logout')
    //     router.push('/')
    //   })
    //   .finally(() => {
    //     formDrawerRef.value.hideLoading()
    //   })
  })
}

const handleEdit = () => {
  console.log('handleEdit')
}

const handleDelete = () => {
  console.log('handleDelete')
}

defineExpose({
  handleCreate
})
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
