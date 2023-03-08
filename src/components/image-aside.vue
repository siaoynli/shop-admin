<template>
  <el-aside v-loading="loading" width="220px" class="image-aside">
    <div class="top">
      <aside-list
        v-for="(item, index) in imageClasses"
        :key="index"
        :active="activeId == item.id"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
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
import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass
} from '~/api/image'
import AsideList from '~/components/aside-list.vue'
import FormDrawer from './form-drawer.vue'
import { toast, showModal } from '~/composables/utils'

const loading = ref(false)

const imageClasses = ref([])
const activeId = ref(0)

const current_page = ref(1)
const totalCount = ref(0)

const getData = (p = 1) => {
  current_page.value = p
  loading.value = true
  getImageClassList(current_page.value)
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

const handleCreate = () => {
  editId.value = 0

  form.name = ''
  form.order = imageClasses.value[0] ? imageClasses.value[0].order : 1
  formDrawerRef.value.open()
}

const handleEdit = item => {
  formDrawerRef.value.open()

  form.name = item.name
  form.order = item.order
  editId.value = item.id
}

const handleDelete = e => {
  showModal('您确认要删除这条记录吗?')
    .then(() => {
      deleteImageClass(e).then(() => {
        toast('操作成功')
        //重新加载数据
        getData()
      })
    })
    .catch(() => {})
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
