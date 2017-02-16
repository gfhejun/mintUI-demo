const customerList = {
	state: {
		search: {
			condition: {
				customerType: '有效客户',
				belongTo: '我的客户',
				key: ''
			},
			key: '',
			customerType: '有效客户',
			belongTo: '我的客户'
		}
	},
	mutations: {
		//更新搜索条件
		updateCustomerListSearch(state, search) {
			state.search = search;
		},

		//重置搜索条件
		resetCustomerListSearch(state) {
			state.search = {
				condition: {
					customerType: '有效客户',
					belongTo: '我的客户',
					key: ''
				},
				key: '',
				customerType: '有效客户',
				belongTo: '我的客户'
			}
		}
	},
	actions: {},
	getters: {}
}

export default customerList