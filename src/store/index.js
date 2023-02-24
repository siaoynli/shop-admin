import { createStore } from 'vuex'
import { login } from '~/api/manager'
import { getinfo } from '~/api/manager'
import { setToken } from '~/composables/auth'
const store = createStore({
  state() {
    return {
      user: {}
    }
  },
  mutations: {
    SET_USERINFO(state, user) {
      state.user = user
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
    }
  }
})

export default store
