<template>
	<div>
		<mt-header fixed title="商机管理">
			<mt-button icon="back" slot="left" @click="back"></mt-button>
  			<span slot="right">
				<mt-button icon="search" @click="search"></mt-button>
				<mt-button class="add" @click="add">
					<vui-icon name="add"></vui-icon>
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
			<div class="list-item" v-for="item in list">
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
	import axios from 'axios'
	import config from '../../util/config'
	import mylist from 'mixins'

	Vue.use(InfiniteScroll);

	Vue.component(Header.name, Header);
	Vue.component(Spinner.name, Spinner);
	Vue.component(Popup.name, Popup);
	Vue.component(Radio.name, Radio);
	Vue.component(Field.name, Field);

	export default{
		mixins:[mylist],
		methods:{
			loadMore: function () {
				this.loadData();
			},
			back: function () {
				this.$store.commit('resetOpportunityListSearch');
				this.$router.replace({path: '/'});
			},
			initList: function () {
				 return {
                    url: config.config.url.opportunityList,
                    config: {
                    	params: {
	    					visibility: this.belongTo,
	    					optyStatus: this.opportunityType,
	    					empId: this.user.id,
	    					orderText: 1,
	    					userOrgId: this.user.orgId,
	    					userPositionId: this.user.postId,
	    					page: this.page,
	    					visibility: this.belongTo
	  					}
  					}
                }
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
					
					var search = {
						condition: {
							opportunityType: this.opportunityType,
							belongTo: this.belongTo,
							key: this.searchKey
						},
						key: this.searchKey,
						opportunityType: this.opportunityType,
						belongTo: this.belongTo
					};
					this.$store.commit('updateOpportunityListSearch', search);

					var config = {
						params: {
	    					visibility: this.belongTo,
	    					optyStatus: this.opportunityType,
	    					empId: this.user.id,
	    					orderText: 1,
	    					userOrgId: this.user.orgId,
	    					userPositionId: this.user.postId,
	    					page: 1,
	    					visibility: this.belongTo
	  					}
  					}

					this.loadData(config);
				}

				this.searchPopupVisible = false;
			}
		},
		data(){
			return{
				user: this.$store.getters.getUserInfo,
				searchPopupVisible: false,
				opportunityType: this.$store.state.opportunityList.search.opportunityType,
				opportunityTypeOptions: ['全部', '商机识别', '商机验证', '商机确认', '方案设计'],
				belongTo: this.$store.state.opportunityList.search.belongTo,
				belongToOptions: ['我的商机', '我团队的商机'],
				searchKey: this.$store.state.opportunityList.search.key,
				searchCondition: this.$store.state.opportunityList.search.condition
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
		border: 1px solid white;
   		color: white;
   		background-color: #999;
   		border-radius: 6px;
   		padding: 2px 3px;
   		display: inline-block;
		font-size: 12px;
	}

	.add{
		vertical-align: middle;
	}

	.add .vui-icon{
		fill: white;
		width: 20px;
		height: 20px;
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