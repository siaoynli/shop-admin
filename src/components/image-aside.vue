<template>
  <el-aside v-loading="loading" width="220px" class="image-aside">
    <div class="top">
      <aside-list
        v-for="(item, index) in imageClasses"
        :key="index"
        :active="activeId == item.id"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
        @click="handleChangeActiveId(item.id)"
      >
        {{ item.name }}
      </aside-list>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="totalCount"
        hide-on-single-page
        @current-change="getData"
      />
    </div>
  </el-aside>

  <form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
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
        <el-input-number v-model="form.order" :min="1" :max="10000" />
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { toast } from '~/composables/utils'
import AsideList from '~/components/aside-list.vue'
import FormDrawer from './form-drawer.vue'

import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass
} from '~/api/image'

const loading = ref(false)

const imageClasses = ref([])
const activeId = ref(0)

const current_page = ref(1)
const totalCount = ref(0)

const editId = ref(0)
const drawerTitle = computed(() => (editId.value == 0 ? '新增' : '编辑'))
const formDrawerRef = ref(null)
const form = reactive({
  name: '',
  order: 1
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

const resetForm = (row = []) => {
  if (formRef.value) {
    formRef.value.clearValidate()
  }
  if (row) {
    for (const key in form) {
      form[key] = row[key]
    }
  }
}

const handleCreate = () => {
  editId.value = 0
  form.name = ''
  form.order = imageClasses.value[0] ? imageClasses.value[0].order : 1
  formDrawerRef.value.open()
}

const handleEdit = row => {
  resetForm(row)
  formDrawerRef.value.open()
  editId.value = row.id
}

const emit = defineEmits(['change'])

//点击触事件
const handleChangeActiveId = id => {
  activeId.value = id
  //将id传递到父组件方法中
  emit('change', id)
}

function getData(page = null) {
  if (page) {
    current_page.value = page
  }
  loading.value = true
  getImageClassList(current_page.value)
    .then(res => {
      imageClasses.value = res.list
      totalCount.value = res.totalCount
      activeId.value = imageClasses.value[0] ? imageClasses.value[0].id : 0
      handleChangeActiveId(activeId.value)
    })
    .finally(() => {
      loading.value = false
    })
}

getData()

const handleSubmit = () => {
  formRef.value.validate(valid => {
    if (!valid) {
      return false
    }
    formDrawerRef.value.showLoading()

    const requestFunc =
      editId.value == 0
        ? createImageClass(form)
        : updateImageClass(editId.value, form)
    requestFunc
      .then(() => {
        toast('操作成功')
        //重新加载数据
        getData(editId.value ? current_page.value : 1)
        formDrawerRef.value.close()
      })
      .finally(() => {
        formDrawerRef.value.hideLoading()
      })
  })
}

const handleDelete = e => {
  loading.value = true
  deleteImageClass(e)
    .then(() => {
      toast('操作成功')
      //重新加载数据
      getData()
    })
    .finally(() => {
      loading.value = false
    })
}

defineExpose({
  handleCreate
})
</script>

<style scoped lang="postcss">
.image-aside {
  border-right: 1px #eee solid;
  position: relative;
  height: 100%;
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
