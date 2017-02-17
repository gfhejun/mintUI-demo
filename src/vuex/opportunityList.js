const opportunityList = {
	state: {
		search: {
			condition: {
				opportunityType: '全部',
				belongTo: '我的商机',
				key: ''
			},
			key: '',
			opportunityType: '全部',
			belongTo: '我的商机'
		}
	},
	mutations: {
		//更新搜索条件
		updateOpportunityListSearch(state, search) {
			state.search = search;
		},

		//重置搜索条件
		resetOpportunityListSearch(state) {
			state.search = {
				condition: {
					opportunityType: '全部',
					belongTo: '我的商机',
					key: ''
				},
				key: '',
				opportunityType: '全部',
				belongTo: '我的商机'
			}
		}
	},
	actions: {},
	getters: {}
}

export default opportunityList