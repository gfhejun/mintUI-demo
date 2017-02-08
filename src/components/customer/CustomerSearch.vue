<template>
	<div>
		<mt-header fixed title="客户查询">
			<router-link to="/" slot="left">
    			<mt-button icon="back"></mt-button>
  			</router-link>
		</mt-header>
		<div class="searchbar">
			<input type="text" placeholder="请输入客户名称" v-model="searchkey">
			<mt-button class="searchbtn" type="primary" size="small" @click.native="search">搜索</mt-button>
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
						<img src="../../assets/user.png">
						<span>{{item.serve_team}}</span>
					</div>
				</div>
				<div class="right">
					<img v-if="item.is_visited==0" src="../../assets/star.png" @click="potentialCustomer(item.name)">
					<img v-if="item.is_visited==1" src="../../assets/star_yellow.png">	
				</div>
			</div>
			<div class="load-more" v-if="!init">
				<div v-if="!loading && disableLoadingMore">已无更多数据</div>
				<div v-if="!disableLoadingMore">
					加载更多数据
					<mt-spinner style="display:inline-block" type="triple-bounce" color="#26a2ff" :size="30"></mt-spinner>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import {Header, Search, Button, MessageBox, Spinner, InfiniteScroll} from 'mint-ui'
	import axios from 'axios'
	import config from '../../util/config'

	Vue.use(InfiniteScroll);

	Vue.component(Header.name, Header);
	Vue.component(Search.name, Search);
	Vue.component(Button.name, Button);
	Vue.component(Spinner.name, Spinner);

	export default{
		methods:{
			//搜索客户
			search: function () {
				if (this.loading){
					return;
				}
				this.init = true;
				this.loading = true;
				this.disableLoadingMore = true;
				this.result = [];
				this.page = 2;
				
				var httpConfig = {
					params: {
    					dataSource: 'siebel',
    					searchKey: this.searchkey,
    					postnId: "1-5A-4576"
  					}
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
    					page: this.page
  					}
				}

				var url = config.config.url.host + config.config.url.customerSearch;
				axios.get(url, httpConfig)
				.then((response) =>{
					this.loading = false;
					if (response.status == 200){
						this.page++;
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
				loading: false, //是否正在加载数据
				disableLoadingMore: true, //禁止加载更多
				page: 2, //下一页页码
				init: true //是否初始化
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

	.list-content{
		position: absolute;
		top: 90px;
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

	.right img{
		width: 25px;
		height: 25px;
	}

	.serve-team img{
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