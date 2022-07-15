import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'
Vue.use(Vuex)
const token = 'TOKEN'
export default new Vuex.Store({
  state: {
    user: getToken(token) || []
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
      setToken(token, payload)
      // localStorage.setItem('TOKEN', JSON.stringify(payload))
    }
  }
})
