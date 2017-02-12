<template>
	<div>
		<mt-header fixed title="商机管理">
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
		<mt-popup class="searchPopup"
  			v-model="searchPopupVisible"
  			:closeOnClickModal="false"
  			position="right">
  			<div>
  				<mt-header fixed title="请选择筛选条件">
  					<span slot="left">
  						<mt-button icon="back" @click="closeSearchPopup"></mt-button>
  					</span>
  				</mt-header>
  				<div>
  					<mt-radio
					  title="商机类型"
					  v-model="opportunityType"
					  :options="opportunityTypeOptions">
					</mt-radio>
					<mt-radio
					  title="商机归属"
					  v-model="belongTo"
					  :options="belongToOptions">
					</mt-radio>
					<mt-field placeholder="根据商机名称搜索（支持模糊匹配）" v-model="searchKey" style="margin-top:30px"></mt-field>
  				</div>
  			</div>
		</mt-popup>
		<div class="searchArea">
			<div class="title">筛选:</div>
			<span>{{opportunityType}}</span>
			<span>{{belongTo}}</span>
			<span v-if="searchKey">{{searchKey | longText(8)}}</span>
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
					<span class="name">{{item.name}}</span>
				</div>
				<div class="type">
					<span>{{item.gfrequiredtype | longText(18)}}</span>
				</div>
				<div style="margin: 5px 0 5px 0">
					<span class="status">{{item.status}}</span>
					<span class="stage">{{item.salesstage}}</span>
				</div>
			</div>
			<div class="load-more" v-if="!init">
				<div v-if="!loading && disableLoadingMore">已无更多商机</div>
				<div v-if="!disableLoadingMore">
					加载更多商机
					<mt-spinner style="display:inline-block" type="triple-bounce" color="#26a2ff" :size="30"></mt-spinner>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import { Header, MessageBox, Spinner, InfiniteScroll, Popup, Radio, Field } from 'mint-ui'
	import { ButtonTab, ButtonTabItem } from 'vux'
	import axios from 'axios'
	import config from '../../util/config'

	Vue.use(InfiniteScroll);

	Vue.component(Header.name, Header);
	Vue.component(Spinner.name, Spinner);
	Vue.component(Popup.name, Popup);
	Vue.component(Radio.name, Radio);
	Vue.component(Field.name, Field);

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
    					optyStatus: this.opportunityType,
    					empId: this.user.id,
    					orderText: 1,
    					userOrgId: this.user.orgId,
    					userPositionId: this.user.postId,
    					page: 1,
    					visibility: this.belongTo
  					}
				}

				var url = config.config.url.opportunityList;
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
    					optyStatus: this.opportunityType,
    					empId: this.user.id,
    					orderText: 1,
    					userOrgId: this.user.orgId,
    					userPositionId: this.user.postId,
    					page: this.nextPage,
    					visibility: this.belongTo
  					}
				}

				var url = config.config.url.opportunityList;
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
				if (this.optyStatus == tab){
					return;
				}
				this.optyStatus = tab;
				this.loadData();
			},
			add: function () {
				console.log('add!'); 
			},
			search: function () {
				this.searchPopupVisible = true;
			},
			closeSearchPopup: function () {
				if (this.searchCondition.opportunityType != this.opportunityType
					|| this.searchCondition.belongTo != this.belongTo
					|| this.searchCondition.searchKey != this.searchKey){
					this.searchCondition.opportunityType = this.opportunityType;
					this.searchCondition.belongTo = this.belongTo;
					this.searchCondition.searchKey = this.searchKey;

					this.loadData();
				}

				this.searchPopupVisible = false;
			}
		},
		created(){
			this.loadData();
		},
		data(){
			return{
				result: [], //数据列表
				loading: false, //是否正在加载数据
				disableLoadingMore: true, //禁止加载更多
				nextPage: 2, //下一页页码
				init: true, //是否初始化
				user: this.$store.getters.getUserInfo,
				searchPopupVisible: false,
				opportunityType: '全部',
				opportunityTypeOptions: ['全部', '商机识别', '商机验证', '商机确认', '方案设计'],
				belongTo: '我的商机',
				belongToOptions: ['我的商机', '我团队的商机'],
				searchKey: '',
				searchCondition: {opportunityType:'全部', belongTo:'我的商机',searchKey:''}
			}
		}
	}
</script>
<style type="text/css" scoped>
	.searchPopup{
		height: 100%;
		width: 100%;
	}

	.searchPopup > div > div{
		margin-top: 50px;
	}

	.searchArea{
		margin-top: 45px;
		padding: 5px;
	}

	.searchArea div{
		display: inline-block;
		margin-left: 5px;
		font-size: 15px;
	}

	.searchArea span{
		border: 1px solid #00a0e2;
   		color: #00a0e2;
   		border-radius: 3px;
   		padding: 0 3px;
   		display: inline-block;
		font-size: 12px;
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

	.name{

	}

	.type span{
		display: inline-block;
		font-size: 14px;
		color: #999;
		height: 20px;
		vertical-align: bottom;
	}

	.stage{
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
</style>