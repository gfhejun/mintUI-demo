import Vue from 'vue'
import Vuex from 'vuex'
import common from './Common'

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		common: common
	}
})

export default store;