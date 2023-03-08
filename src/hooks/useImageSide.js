import { ref, reactive, computed } from 'vue'
import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass
} from '~/api/image'

import { toast } from '~/composables/utils'

export function useImageSide() {
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

  return {
    loading,
    imageClasses,
    activeId,
    totalCount,
    drawerTitle,
    formDrawerRef,
    form,
    formRef,
    rules,
    handleSubmit,
    handleCreate,
    handleEdit,
    handleDelete
  }
}
