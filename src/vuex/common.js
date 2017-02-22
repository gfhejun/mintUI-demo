const common = {
	state: {
		user: {
			id: '1-5B-790',
			loginId: 'chend',
			username: '陈东',
			password: 'a123456',
			orgId: '1-59-1172',
			orgName: '资产托管部',
			deptId: '1-59-1172',
			deptName: '资产托管部',
			postId: '1-5A-700',
			postName: '投行华南三部总监(D)'
		},
		home: {
			selected: '主页'
		}
	},
	mutations: {
		changeHomeTab(state, tab) {
			state.home.selected = tab;
		}
	},
	actions: {},
	getters: {
		getUserInfo: state => {
			return state.user;
		},
		getCurrentHomePage: state => {
			return state.home.selected;
		}
	}
}

export default common