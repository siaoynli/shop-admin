<template>
  <el-card class="border-0" shadow="never">
    <div class="flex justify-between items-center">
      <div class="pb-3">
        <el-button
          type="primary"
          size="small"
          class="text-gray-200"
          @click="handleCreate"
          >新增</el-button
        >
      </div>
      <el-tooltip effect="dark" content="刷新数据" placement="top">
        <el-icon class="cursor-pointer" @click="getData()"><Refresh /></el-icon>
      </el-tooltip>
    </div>
    <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="create_time" label="发布时间" width="180" />
      <el-table-column align="right" label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <span class="pl-2" @click.stop="() => {}">
            <el-popconfirm
              title="确定要删除这条记录吗?"
              confirm-button-text="是"
              cancel-button-text="否"
              width="220"
              @confirm="handleDelete(scope.row.id)"
            >
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex justify-center p-3">
      <el-pagination
        background
        layout="prev,pager, next"
        :total="totalCount"
        :current-page="current_page"
        :page-size="limit"
        hide-on-single-page
        @current-change="getData"
      />
    </div>
  </el-card>

  <form-drawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :inline="false"
      label-width="150px"
    >
      <el-form-item prop="title" label="公告标题">
        <el-input v-model="form.title" placeholder="" />
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input v-model="form.content" type="textarea" :rows="5" />
      </el-form-item>
    </el-form>
  </form-drawer>
</template>
<script setup>
import { ref, computed, reactive } from 'vue'
import {
  getNoticeList,
  deleteNotice,
  createNotice,
  updateNotice
} from '~/api/notice'
import { toast } from '~/composables/utils'
import FormDrawer from '~/components/form-drawer.vue'
const tableData = ref([])
const totalCount = ref(0)
const current_page = ref(1)
const limit = ref(15)
const loading = ref(false)

const editId = ref(0)
const drawerTitle = computed(() => (editId.value == 0 ? '新增' : '编辑'))

function getData(page = null) {
  if (page) {
    current_page.value = page
  }

  loading.value = true
  getNoticeList(current_page.value, limit.value)
    .then(res => {
      tableData.value = res.list
      totalCount.value = res.totalCount
    })
    .finally(() => {
      loading.value = false
    })
}
getData()

const form = reactive({
    title: '',
    content: ''
  }),
  formDefault = form
//重置表单用到的变量

const formDrawerRef = ref(null)
const formRef = ref(null)

const rules = {
  title: [
    {
      required: true,
      message: '请输入公告标题',
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'blur'
    }
  ]
}

const resetForm = (row = false) => {
  if (formRef.value) {
    formRef.value.clearValidate()
  }
  if (row) {
    for (const key in form) {
      form[key] = row[key]
    }
    return
  }

  form.value = formDefault.value
}

const handleCreate = () => {
  resetForm()
  editId.value = 0
  formDrawerRef.value.open()
}

const handleSubmit = () => {
  formRef.value.validate(valid => {
    if (!valid) {
      return false
    }
    formDrawerRef.value.showLoading()

    const requestFunc =
      editId.value == 0 ? createNotice(form) : updateNotice(editId.value, form)
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

const handleEdit = row => {
  resetForm(row)
  editId.value = row.id
  formDrawerRef.value.open()
}

const handleDelete = id => {
  loading.value = true
  deleteNotice(id)
    .then(() => {
      toast('操作成功')
      getData(current_page.value)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
