import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartInfo:[]
  },
  mutations: {
    setCartInfo(state,payload){
      state.cartInfo.push(payload)
    }
  },
  actions: {
    
  },
  modules: {
  }
})
