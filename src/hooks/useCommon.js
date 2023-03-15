import { ref, reactive } from 'vue'

export function useInitTable(opt = {}) {
  const tableData = ref([])
  const totalCount = ref(0)
  const currentPage = ref(1)
  const limit = ref(15)
  const loading = ref(false)

  let searchForm = {}

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
        ...searchForm
      })
      .then(res => {
        if (opt.onGetListSuccess && typeof opt.onGetListSuccess == 'function') {
          opt.onGetListSuccess(res)
        } else {
          tableData.value = res.list
          totalCount.value = res.totalCount
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
  getData()

  return {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    totalCount,
    limit,
    getData
  }
}
