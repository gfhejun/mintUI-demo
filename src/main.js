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

Vue.use(MintUI)
Vue.use(VueRouter)

const routes = [{
	path: '/',
	component: Home
}, {
	path: '/customersearch',
	component: CustomerSearch
}, {
	path: '*',
	redirect: Home
}]

const router = new VueRouter({
	routes
})

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
	router,
	render: h => h(App)
}).$mount('#app')