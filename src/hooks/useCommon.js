import { ref, reactive, computed } from 'vue'
import { toast } from '~/composables/utils'
// 初始化table 和搜索
export function useInitTable(opt = {}) {
  const tableData = ref([])
  const totalCount = ref(0)
  const currentPage = ref(1)
  const limit = ref(15)
  const loading = ref(false)

  let searchForm = {}

  let params = opt.params || {}

  let resetSearchForm = () => {}

  console.log(`output->`, opt.searchForm)

  if (opt.searchForm) {
    searchForm = reactive({ ...opt.searchForm })
    resetSearchForm = () => {
      for (const key in opt.searchForm) {
        searchForm[key] = opt.searchForm[key]
      }
      getData()
    }
  }

  function getData(page = null) {
    if (page) {
      currentPage.value = page
    }

    loading.value = true

    opt
      .getList(currentPage.value, {
        limit: limit.value,
        ...params,
        ...searchForm
      })
      .then(res => {
        if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
          opt.onGetListSuccess(res)
        }
        tableData.value = res.list
        totalCount.value = res.totalCount
      })
      .finally(() => {
        loading.value = false
      })
  }

  getData()

  const handleDelete = id => {
    console.log(`output->`, id)
    loading.value = true
    opt
      .delete(id)
      .then(() => {
        toast('操作成功')
        getData(null)
      })
      .finally(() => {
        loading.value = false
      })
  }

  const handleChangeStatus = (status, row) => {
    row.statusLoading = true

    opt
      .updateStatus(row.id, status)
      .then(() => {
        toast('操作成功')
        row.status = status
      })
      .finally(() => {
        row.statusLoading = false
      })
  }

  return {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    totalCount,
    limit,
    getData,
    handleDelete,
    handleChangeStatus
  }
}

// 新增修改
export function useInitForm(opt = {}) {
  const form = reactive({})

  //重置表单用到的变量
  const formDrawerRef = ref(null)
  const formRef = ref(null)

  const rules = opt.rules || {}

  const editId = ref(0)
  const drawerTitle = computed(() => (editId.value == 0 ? '新增' : '编辑'))

  const resetForm = row => {
    if (formRef.value) {
      formRef.value.clearValidate()
    }
    for (const key in row) {
      form[key] = row[key]
    }
  }

  const handleCreate = () => {
    resetForm(opt.form)
    editId.value = 0
    formDrawerRef.value.open()
  }

  const handleEdit = row => {
    resetForm(row)
    editId.value = row.id
    formDrawerRef.value.open()
  }

  const handleSubmit = () => {
    formRef.value.validate(valid => {
      if (!valid) {
        return false
      }
      formDrawerRef.value.showLoading()

      const requestFunc = editId.value
        ? opt.update(editId.value, form)
        : opt.create(form)
      requestFunc
        .then(() => {
          toast('操作成功')
          if (opt.getData && typeof opt.getData == 'function') {
            opt.getData(editId.value ? null : 1)
          }
          formDrawerRef.value.close()
        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })
    })
  }

  return {
    editId,
    formDrawerRef,
    drawerTitle,
    form,
    rules,
    formRef,
    handleCreate,
    handleEdit,
    handleSubmit
  }
}
