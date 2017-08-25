import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    token: '',
    username: ''
  },
  mutations: {
    setToken (state, payload) {
      state.token = payload
    },
    setUsername (state, payload) {
      state.username = payload
    }
  }
})

export default store
