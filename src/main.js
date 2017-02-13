// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VuiIcon from 'vui-icon'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import Home from './components/home/Home'
import CustomerSearch from './components/customer/CustomerSearch'
import CustomerList from './components/customer/CustomerList'
import CustomerHome from './components/customer/CustomerHome'
import ActivityList from './components/activity/ActivityList'
import OpportunityList from './components/opportunity/OpportunityList'
import ContactList from './components/contact/ContactList'
import UserInfo from './components/setting/UserInfo'
import store from './vuex/store'

Vue.use(MintUI)
Vue.use(VueRouter)
Vue.use(VuiIcon)

const routes = [{
	path: '/',
	component: Home,
	name: 'home'
}, {
	path: '/customersearch',
	component: CustomerSearch,
	name: 'customersearch'
}, {
	path: '/customerlist',
	component: CustomerList,
	name: 'customerlist'
}, {
	path: '/customerhome',
	component: CustomerHome,
	name: 'customerhome'
}, {
	path: '/activitylist',
	component: ActivityList,
	name: 'activitylist'
}, {
	path: '/contactlist',
	component: ContactList,
	name: 'contactlist'
}, {
	path: '/opportunitylist',
	component: OpportunityList,
	name: 'opportunitylist'
}, {
	path: '/userinfo',
	component: UserInfo,
	name: 'userinfo'
}, {
	path: '*',
	redirect: Home
}]

const router = new VueRouter({
	routes
})

FastClick.attach(document.body)

//自定义过滤器
Vue.filter("longText", function(text, size) {
	if (text == undefined || text == '') {
		return text;
	}

	if (text.length > size && text.length > 0) {
		return text.substring(0, size) + '...';
	}
	return text;
})

/* eslint-disable no-new */
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')