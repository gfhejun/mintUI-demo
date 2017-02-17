const activityList = {
	state: {
		search: {
			condition: {
				actionStatus: '全部',
				belongTo: '我的活动',
				key: ''
			},
			key: '',
			actionStatus: '全部',
			belongTo: '我的活动'
		}
	},
	mutations: {
		//更新搜索条件
		updateActivityListSearch(state, search) {
			state.search = search;
		},

		//重置搜索条件
		resetActivityListSearch(state) {
			state.search = {
				condition: {
					actionStatus: '全部',
					belongTo: '我的活动',
					key: ''
				},
				key: '',
				actionStatus: '全部',
				belongTo: '我的活动'
			}
		}
	},
	actions: {},
	getters: {}
}

export default activityList