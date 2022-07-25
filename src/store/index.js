import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils'
Vue.use(Vuex)
const token = 'TOKEN'
const History = 'HISTORY'
export default new Vuex.Store({
  state: {
    user: getToken(token) || {},
    history: getToken(History) || []
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
      setToken(token, payload)
      // localStorage.setItem('TOKEN', JSON.stringify(payload))
    },
    setHistory (state, record = []) {
      console.log(record)
      state.history = record
      setToken(History, record)
    }
  }
})
