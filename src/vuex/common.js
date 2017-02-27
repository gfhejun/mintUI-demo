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
			selected: '主页',
			chartInit: false,
			chartSelected: 'my',
			chartOption: {
				credits: {
					enabled: false
				},
				exporting: {
					enabled: false
				},
				chart: {
					type: 'column'
				},
				title: {
					text: ''
				},
				xAxis: {
					categories: ['客户数量', '本年已服务客户']
				},
				yAxis: {
					title: {
						text: ''
					}
				},
				series: [{
					name: '有效客户',
					dataLabels: {
						enabled: true
					}
				}, {
					name: '潜在客户',
					dataLabels: {
						enabled: true
					}
				}],
				loading: {
					labelStyle: {
						color: 'red',
						fontSize: '12px'
					}
				},
			}
		}
	},
	mutations: {
		changeHomeTab(state, tab) {
			state.home.selected = tab;
		},
		changeChartTab(state, tab) {
			state.home.chartSelected = tab;
		},
		updateInit(state) {
			state.home.chartInit = true;
		},
		updateHomeChartOption(state, series) {
			state.home.chartOption.series[0].data = series[0];
			state.home.chartOption.series[1].data = series[1];
		}
	},
	actions: {},
	getters: {
		getUserInfo: state => {
			return state.user;
		},
		getCurrentHomePage: state => {
			return state.home.selected;
		},
		getCurrentChartTab: state => {
			return state.home.chartSelected;
		},
		getHomeChartOption: state => {
			return state.home.chartOption;
		},
		getChartInit: state => {
			return state.home.chartInit;
		}
	}
}

export default common