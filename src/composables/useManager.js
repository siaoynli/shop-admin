import { ref, reactive } from 'vue'
import { updatePassword } from '~/api/manager'
import { toast, showModal } from '~/composables/utils'

import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export function useRePassword() {
  const router = useRouter()
  const store = useStore()

  const form = reactive({
    oldpassword: '',
    password: '',
    repassword: ''
  })
  const passwordFormRef = ref(null)

  const rules = {
    oldpassword: [
      {
        required: true,
        message: '请输入旧密码',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: '请输入新密码',
        trigger: 'blur'
      }
    ],
    repassword: [
      {
        required: true,
        message: '请确认新密码',
        trigger: 'blur'
      }
    ]
  }

  const formDrawerRef = ref(null)
  const onSubmit = () => {
    passwordFormRef.value.validate(valid => {
      if (!valid) {
        return false
      }
      formDrawerRef.value.showLoading()
      updatePassword(form)
        .then(() => {
          toast('修改密码成功，请重新登陆')
          store.dispatch('logout')
          router.push('/')
        })
        .finally(() => {
          formDrawerRef.value.hideLoading()
        })
    })
  }

  const openRePasswordForm = () => formDrawerRef.value.open()

  return {
    form,
    formDrawerRef,
    passwordFormRef,
    rules,
    openRePasswordForm,
    onSubmit
  }
}

export function useLogout() {
  const router = useRouter()
  const store = useStore()
  const logout = () =>
    showModal('您确认要退出系统吗?')
      .then(() => {
        store
          .dispatch('logout')
          .then(res => {
            toast(res)
          })
          .finally(() => {
            router.push('/login')
          })
      })
      .catch(() => {})

  return {
    logout
  }
}
