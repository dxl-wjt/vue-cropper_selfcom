import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

//挂载到vue实例上
export default store