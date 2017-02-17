import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import customerList from './customerList'
import activityList from './activityList'
import opportunityList from './opportunityList'

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		common: common,
		customerList: customerList,
		activityList: activityList,
		opportunityList: opportunityList
	}
})

export default store;