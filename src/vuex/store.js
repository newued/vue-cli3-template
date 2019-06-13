import Vue from 'vue'
import Vuex from 'vuex'
import activity  from './modules/showPics'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
    activity,
  },
  getters
})
