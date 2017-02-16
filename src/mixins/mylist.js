import is from 'is'
import util from 'util'
import routeData from 'route-data/routeData'
import axios from 'axios'

const getPageKey = () => {
	return is.object(history.state) ? history.state.key : location.href
}

export default {
	mixins: [routeData],
	routeData() {
		return {
			init: true, //是否首次加载数据
			loading: false, //是否在请求中
			page: 1, //当前请求的页数
			list: [], //列表的数据
			disableLoadingMore: true //是否可以上拉加载更多
		}
	},
	mounted() {
		this.loading = false
	},
	created() {
		if (getPageKey() != this.list.key) { //页面前进
			if (this.page == 1) { //首次访问组件
				this.loadData()
				this.list.key = getPageKey()
			} else {
				Object.assign(this.$data, this.$options.routeData())
				this.$nextTick(() => {
					this.list.key = getPageKey()
					this.loadData()
				})
			}
		} else {
			this.loading = false //防止路由切换时，没有执行回调时引发的bug
		}
	},
	methods: {
		loadData(newConfig) {
			if (this.loading) {
				return;
			}

			this.loading = true

			var {
				url,
				config
			} = this.initList()

			if (newConfig) {
				config = newConfig;
			}

			if (config.params.page == 1) {
				var tempKey = this.list.key;
				this.list = [];
				this.list.key = tempKey;
			}

			axios.get(url, config)
				.then((response) => {
					this.init = false;
					this.loading = false;

					if (response.status == 200) {

						response.data.rows.forEach((item) => this.list.push(item))
						if (this.list.length >= response.data.total) {
							//已无更多数据时显示提示，并且禁止上拉加载更多
							this.disableLoadingMore = true;
						} else {
							this.disableLoadingMore = false;
						}
						this.page++;
					}

					this.loading = false //请求完成

				}, (response) => {
					this.loading = false;
					console.log('出现问题:' + response);
				})
		}
	}
}