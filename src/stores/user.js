import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ user: {} }),
  getters: {
    avatar: state => state.user.avatar
  },
  actions: {
    setUserInfo(user) {
      this.user = user
    }
  }
})
