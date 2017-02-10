<template>
	<div>
		<mt-header fixed title="我的活动">
			<router-link to="/" slot="left">
    			<mt-button icon="back"></mt-button>
  			</router-link>
  			<span slot="right">
				<mt-button icon="search" @click="search"></mt-button>
				<mt-button class="add" @click="add">
					<img src="../../assets/add.png">
				</mt-button>
  			</span>
		</mt-header>
		<div class="tab">
			<button-tab>
		      <button-tab-item @on-item-click="changeTab('全部')" selected>全部</button-tab-item>
		      <button-tab-item @on-item-click="changeTab('进行中')">进行中</button-tab-item>
		      <button-tab-item @on-item-click="changeTab('已完成')">已完成</button-tab-item>
		      <button-tab-item @on-item-click="changeTab('已取消')">已取消</button-tab-item>
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
				<div>
					<span class="description">{{item.description}}</span>
				</div>
				<div class="customer" v-if="item.accountname">
					<img src="../../assets/user.png">
				    <span>{{item.accountname | longText}}</span>
				</div>
				<div style="margin: 5px 0 5px 0">
					<span class="status">{{item.status}}</span>
					<span class="type">{{item.type}}</span>
					<div class="date">
						<span v-if="item.status=='已完成'">完成于{{item.completeddate}}</span>
						<span v-if="item.status!='已完成'&&item.status!='已取消'">计划开始于{{item.planneddate}}</span>
					</div>
				</div>
			</div>
			<div class="load-more" v-if="!init">
				<div v-if="!loading && disableLoadingMore">已无更多活动</div>
				<div v-if="!disableLoadingMore">
					加载更多活动
					<mt-spinner style="display:inline-block" type="triple-bounce" color="#26a2ff" :size="30"></mt-spinner>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import { Header, MessageBox, Spinner, InfiniteScroll } from 'mint-ui'
	import { ButtonTab, ButtonTabItem } from 'vux'
	import axios from 'axios'
	import config from '../../util/config'

	Vue.use(InfiniteScroll);

	Vue.component(Header.name, Header);
	Vue.component(Spinner.name, Spinner);

	export default{
		components:{
			ButtonTab,
			ButtonTabItem
		},
		methods:{
			//加载数据
			loadData: function () {
				if (this.loading){
					return;
				}
				this.init = true;
				this.loading = true;
				this.disableLoadingMore = true;
				this.result = [];
				this.nextPage = 2;
				
				var httpConfig = {
					params: {
    					actionStatus: this.actionStatus,
    					empId: "1-5B-4873",
    					orderText: 1,
    					userOrgId: '1-59-1127',
    					userPositionId: '1-5A-4576',
    					page: 1,
    					orderBy: 'created'
  					}
				}

				var url = config.config.url.host + config.config.url.activityList;
				axios.get(url, httpConfig)
				.then((response) =>{
					this.init = false;
					this.loading = false;

					if (response.status == 200){
						this.result = response.data.rows;
						if (this.result.length >= response.data.total){
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

			//加载更多
			loadMore: function () {
				if (this.loading){
					return;
				}

				this.loading = true;

				var httpConfig = {
					params: {
    					actionStatus: this.actionStatus,
    					empId: "1-5B-4873",
    					orderText: 1,
    					userOrgId: '1-59-1127',
    					userPositionId: '1-5A-4576',
    					page: this.nextPage,
    					orderBy: 'created'
  					}
				}

				var url = config.config.url.host + config.config.url.activityList;
				axios.get(url, httpConfig)
				.then((response) =>{
					this.loading = false;
					if (response.status == 200){
						this.nextPage++;
						this.result = this.result.concat(response.data.rows);
						if (this.result.length >= response.data.total){
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
			},
			changeTab: function (tab) {
				if (this.actionStatus == tab){
					return;
				}
				this.actionStatus = tab;
				this.loadData();
			},
			add: function () {
				console.log('add!'); 
			},
			search: function () {
				console.log('search!');
			}
		},
		created(){
			this.loadData();
		},
		data(){
			return{
				actionStatus: '全部', //当前页
				result: [], //数据列表
				loading: false, //是否正在加载数据
				disableLoadingMore: true, //禁止加载更多
				nextPage: 2, //下一页页码
				init: true //是否初始化
			}
		}
	}
</script>
<style type="text/css" scoped>
	.tab{
		margin-top: 50px;
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

	.add{
		vertical-align: middle;
	}

	.add img{
		width: 30px;
		height: 30px;
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

	.spinner{
		height: 100%;
		width: 100%;
		text-align: center;
		padding-top: 100px;
	}

	.list-item{
		border-bottom: 1px solid #ddd;
		padding: 5px 10px;
		word-break: break-all;
	}

	.load-more{
		text-align: center;
		padding: 10px 0;
		border-bottom: 1px solid #ddd;
	}

	.description{

	}

	.customer span{
		display: inline-block;
		font-size: 14px;
		color: #999;
		height: 20px;
		vertical-align: bottom;
	}

	.customer img{
		width: 20px;
		height: 20px;
		vertical-align: bottom;
	}

	.type{
		border: 1px solid #00a0e2;
   		color: #00a0e2;
   		border-radius: 3px;
   		padding: 0 3px;
   		display: inline-block;
		font-size: 12px;
	}

	.status{
		border: 1px solid red;
   		color: red;
   		border-radius: 3px;
   		padding: 0 3px;
   		display: inline-block;
		font-size: 12px;
	}

	.date{
		float: right;
		display: inline-block;
		margin-top: 5px;
		font-size: 12px;
		color:#999;
	}

</style>