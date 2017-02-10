// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import Home from './components/home/Home'
import CustomerSearch from './components/customer/CustomerSearch'
import ActivityList from './components/activity/ActivityList'
import ContactList from './components/contact/ContactList'

Vue.use(MintUI)
Vue.use(VueRouter)

const routes = [{
	path: '/',
	component: Home,
	name: 'home'
}, {
	path: '/customersearch',
	component: CustomerSearch,
	name: 'customersearch'
}, {
	path: '/activitylist',
	component: ActivityList,
	name: 'activitylist'
}, {
	path: '/contactlist',
	component: ContactList,
	name: 'contactlist'
}, {
	path: '*',
	redirect: Home
}]

const router = new VueRouter({
	routes
})

FastClick.attach(document.body)

//自定义过滤器
Vue.filter("longText", function(text) {
	if (text.length > 18) {
		return text.substring(0, 17) + '...';
	}
	return text;
})

/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app')