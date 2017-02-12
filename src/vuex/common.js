const common = {
	state: {
		user: {
			id: '1-5B-4873',
			loginId: 'lirong',
			username: '李荣',
			password: 'a123456',
			orgId: '1-59-1127',
			orgName: '战略客户关系管理部',
			deptId: '1-59-1127',
			deptName: '战略客户关系管理部',
			postId: '1-5A-4576',
			postName: '战略客户关系管理部客户关系管理岗'
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