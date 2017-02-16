import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import customerList from './customerList'

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		common: common,
		customerList: customerList
	}
})

export default store;