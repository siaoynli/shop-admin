import { createStore } from 'vuex'
import { login, logout } from '~/api/manager'
import { getinfo } from '~/api/manager'
import { setToken, removeToken } from '~/composables/auth'
const store = createStore({
  state() {
    return {
      //用户信息
      user: {},
      // 侧边宽度
      asideWidth: '250px'
    }
  },
  mutations: {
    SET_USERINFO(state, user) {
      state.user = user
    },
    // 展开或者收缩侧边
    handleAsideWidth(state) {
      state.asideWidth = state.asideWidth == '250px' ? '60px' : '250px'
    }
  },
  actions: {
    login(store, { username, password }) {
      return new Promise((resolve, reject) => {
        login(username, password)
          .then(res => {
            setToken(res.token)
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },

    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getinfo()
          .then(res => {
            commit('SET_USERINFO', res)
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(res => {
            resolve(res)
          })
          .catch(err => reject(err))
          .finally(() => {
            removeToken()
            commit('SET_USERINFO', {})
          })
      })
    }
  }
})

export default store
