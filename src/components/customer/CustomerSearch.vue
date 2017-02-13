<template>
	<div>
		<mt-header fixed title="客户查询">
			<router-link to="/" slot="left">
    			<mt-button icon="back"></mt-button>
  			</router-link>
		</mt-header>
		<div class="searchbar">
			<input type="text" placeholder="请输入客户名称" v-model="searchkey">
			<mt-button class="searchbtn" type="primary" size="small" @click.native="search(true)">查询</mt-button>
		</div>
		<div class="tab">
			<button-tab>
		      <button-tab-item @on-item-click="changeTab('siebel')" selected>系统内用户</button-tab-item>
		      <button-tab-item @on-item-click="changeTab('qxb')">工商信息查询结果
				<mt-badge v-if="count != '0'" size="small" type="error" class="badge">{{count}}</mt-badge>
		      </button-tab-item>
		    </button-tab>
		</div>
		<div class="list-content" 
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="disableLoadingMore"
  			infinite-scroll-distance="10">
			<div class="spinner" v-if="loading && init">
				<mt-spinner type="triple-bounce" color="#26a2ff" :size="30"></mt-spinner>
			</div>
			<div class="list-item" v-for="item in result">
				<div class="left">
					<div class="customer">{{item.name}}</div>
					<div class="serve-team">
						<vui-icon name="people"></vui-icon>
						<span>{{item.serve_team}}</span>
					</div>
				</div>
				<div class="right">
					<vui-icon v-if="item.is_visited==0" name="favor" @click="potentialCustomer(item.name)"></vui-icon>
					<vui-icon v-if="item.is_visited==1" name="favor"></vui-icon>
				</div>
			</div>
			<div class="load-more" v-if="!init">
				<div v-if="!loading && disableLoadingMore">已无更多客户</div>
				<div v-if="!disableLoadingMore">
					加载更多客户
					<mt-spinner style="display:inline-block" type="triple-bounce" color="#26a2ff" :size="30"></mt-spinner>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import {Header, Search, Button, MessageBox, Spinner, InfiniteScroll, Badge, TabContainer, TabContainerItem } from 'mint-ui'
	import axios from 'axios'
	import config from '../../util/config'
	import { ButtonTab, ButtonTabItem } from 'vux'

	Vue.use(InfiniteScroll);

	Vue.component(Header.name, Header);
	Vue.component(Search.name, Search);
	Vue.component(Button.name, Button);
	Vue.component(Spinner.name, Spinner);
	Vue.component(TabContainer.name, TabContainer);
	Vue.component(TabContainerItem.name, TabContainerItem);

	export default{
		components:{
			ButtonTab,
			ButtonTabItem
		},
		methods:{
			changeTab: function (dataSource) {
				if (this.dataSource != dataSource){
					this.dataSource = dataSource;
					if (this.searchkey != ''){
						this.search(false);
					}
				}
			},

			//搜索客户
			search: function (searchKeyChange) {
				if (this.loading || this.searchkey == ''){
					return;
				}
				this.init = true;
				this.loading = true;
				this.disableLoadingMore = true;
				this.result = [];
				this.nextPage = 2;
				
				var httpConfig = {
					params: {
    					dataSource: this.dataSource,
    					searchKey: this.searchkey,
    					postnId: this.user.postId
  					}
				}

				if (searchKeyChange){
					//从启信宝获取查询结果数量
					var countUrl = config.config.url.host + config.config.url.qxb;
					axios.get(countUrl, {params:{searchKey: this.searchkey}})
					.then((response) =>{
						if (response.status == 200){
							if (response.data.total > 10){
								this.count = '10+';
							}else{
								this.count = '' + response.data.total;
							}
						}
					}, (response) => {
						this.loading = false;
						console.log('出现问题:' + response);
					})
				}
				
				var url = config.config.url.host + config.config.url.customerSearch;
				axios.get(url, httpConfig)
				.then((response) =>{
					this.init = false;
					this.loading = false;

					if (response.status == 200){
						this.result = response.data.data.items;
						if (this.result.length >= response.data.data.total){
							//已无更多数据时显示提示，并且禁止上拉加载更多
							this.disableLoadingMore = true;
						}else{
							this.disableLoadingMore = false
						}
					}
				}, (response) => {
					this.loading = false;
					console.log('出现问题:' + response);
				})
			},

			//列入潜在客户
			potentialCustomer: function (customer) {
				MessageBox({
				  title: '列入潜在客户',
				  message: '是否将【' + customer + '】列入潜在客户?',
				  showCancelButton: true
				});
			},

			//加载更多
			loadMore: function () {
				if (this.loading){
					return;
				}

				this.loading = true;

				var httpConfig = {
					params: {
    					dataSource: 'siebel',
    					searchKey: this.searchkey,
    					postnId: "1-5A-4576",
    					page: this.nextPage
  					}
				}

				var url = config.config.url.host + config.config.url.customerSearch;
				axios.get(url, httpConfig)
				.then((response) =>{
					this.loading = false;
					if (response.status == 200){
						this.nextPage++;
						this.result = this.result.concat(response.data.data.items);
						if (this.result.length >= response.data.data.total){
							//已无更多数据时显示提示，并且禁止上拉加载更多
							this.disableLoadingMore = true;
						}else{
							this.disableLoadingMore = false;
						}
					}
				}, (response) => {
					this.loading = false;
					console.log('出现问题:' + response);
				})
			}
		},
		data(){
			return{
				result: [], //数据列表
				searchkey: '', //搜索关键字
				dataSource: 'siebel', //来源是siebel还是启信宝
				loading: false, //是否正在加载数据
				disableLoadingMore: true, //禁止加载更多
				nextPage: 2, //下一页页码
				init: true, //是否初始化
				count: '0', //从启信宝返回数据
				user: this.$store.getters.getUserInfo
			}
		}
	}
</script>
<style type="text/css" scoped>
	.searchbar{
		margin-top: 40px;
	}

	.searchbar input{
		margin: 5px 0 0 5px;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 10px;
		width: 70%;
		font-size: 13px;
	}

	.spinner{
		height: 100%;
		width: 100%;
		text-align: center;
		padding-top: 100px;
	}

	.tab{
		margin-top: 10px;
		padding: 0 5px;
	}

	.tab div a{
		font-size: 10px;
		line-height: 25px;
		height: 25px;
	}

	.tab div a:first-child{
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}

	.tab div a:last-child{
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	.vux-button-group > a.vux-button-group-current{
		border-color: #26a2ff;
		background-color: #26a2ff;
	}

	.mint-badge.is-size-small{
		line-height: 15px;
		padding: 2px 5px;
	}

	.list-content{
		position: absolute;
		top: 130px;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow-y: auto;
		border-top: 1px solid #ddd;
		word-break: break-all;
	}

	.list-item{
		border-bottom: 1px solid #ddd;
	}

	.left{
		padding: 10px 0 10px 10px;
		display: inline-block;
		width: 80%;
	}

	.right{
		display: inline-block;
		width: 15%;
		text-align: center;
	}

	.right .vui-icon{
		width: 25px;
		height: 25px;
	}

	.right .vui-cion:nth-child(2){
		width: 25px;
		height: 25px;
		fill: #FFD700;
	}

	.serve-team .vui-icon{
		width: 25px;
		height: 25px;
		vertical-align: bottom;
	}

	.serve-team span{
		vertical-align: middle;
		font-size: 15px;
		color: #999;
	}

	.load-more{
		text-align: center;
		padding: 10px 0;
		border-bottom: 1px solid #ddd;
	}
</style>