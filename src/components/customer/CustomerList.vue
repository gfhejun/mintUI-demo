<template>
	<div>
		<mt-header fixed title="客户管理">
			<mt-button icon="back" slot="left" @click="back"></mt-button>
  			<span slot="right">
				<mt-button icon="search" @click="search"></mt-button>
				<mt-button class="add" @click="add">
					<vui-icon name="add"></vui-icon>
				</mt-button>
  			</span>
		</mt-header>
		<mt-popup class="search-popup"
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
					  title="客户类型"
					  v-model="customerType"
					  :options="customerTypeOptions">
					</mt-radio>
					<mt-radio
					  title="客户归属"
					  v-model="belongTo"
					  :options="belongToOptions">
					</mt-radio>
					<mt-field placeholder="输入客户名称搜索（支持模糊匹配）" v-model="searchKey" style="margin-top:30px"></mt-field>
  				</div>
  			</div>
		</mt-popup>
		<div class="search-area">
			<div class="title">筛选:</div>
			<span>{{customerType}}</span>
			<span>{{belongTo}}</span>
			<span v-if="searchKey">{{searchKey | longText(8)}}</span>
		</div>
		<div class="list-content" v-scroll-record
			v-infinite-scroll="loadMore"
			infinite-scroll-disabled="disableLoadingMore"
  			infinite-scroll-distance="10">
			<div class="spinner" v-if="loading && init">
				<mt-spinner type="triple-bounce" color="#26a2ff" :size="30"></mt-spinner>
			</div>
			<div>
				<div class="list-item" v-for="item in list" @click="showCustomerHome(item.id)">
				<div>
					<span class="name">{{item.name}}</span>
				</div>
				<div class="owner">
					<vui-icon name="people"></vui-icon>
				    <span>{{item.owner_name}}</span>
				</div>
				<div class="address">
					<vui-icon name="location"></vui-icon>
				    <span>{{item.office_addr | longText(18) }}</span>
				</div>
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
	import { mapState } from 'vuex'
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
			add: function () {
				console.log('add!!');
			},
			search: function () {
				this.searchPopupVisible = true;
			},
			back: function () {
				this.$store.commit('resetCustomerListSearch');
				this.$router.replace({path: '/'});
			},
			closeSearchPopup: function () {
				if (this.searchCondition.customerType != this.customerType
					|| this.searchCondition.belongTo != this.belongTo
					|| this.searchCondition.searchKey != this.searchKey){

					var search = {
						condition: {
							customerType: this.customerType,
							belongTo: this.belongTo,
							key: this.searchKey
						},
						key: this.searchKey,
						customerType: this.customerType,
						belongTo: this.belongTo
					};
					this.$store.commit('updateCustomerListSearch', search);

					var customerType = 'active';
					if (this.customerType == '有效客户'){
						customerType = 'active';
					}else{
						customerType = 'potential';
					}

					var config = {
                    	params: {
	    					type: customerType,
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
			},
			//进入客户主页
			showCustomerHome: function (id) {
				this.$router.push({ name: 'customerhome', params: { id: id }}); 
			},
			initList: function () {
				var customerType = 'active';
				
				if (this.customerType == '有效客户'){
					customerType = 'active';
				}else{
					customerType = 'potential';
				}

				 return {
                    url: config.config.url.host + config.config.url.customerList,
                    config: {
                    	params: {
    					type: customerType,
    					empId: this.user.id,
    					orderText: 1,
    					userOrgId: this.user.orgId,
    					userPositionId: this.user.postId,
    					page: this.page,
    					visibility: this.belongTo
  					}}
                }
			}
		},
		data(){
			return{
				user: this.$store.getters.getUserInfo,
				searchPopupVisible: false,
				customerType: this.$store.state.customerList.search.customerType,
				customerTypeOptions: ['有效客户', '潜在客户'],
				belongTo: this.$store.state.customerList.search.belongTo,
				belongToOptions: ['我的客户', '我团队的客户', '我部门的客户', '我分管的客户', '公司客户'],
				searchKey: this.$store.state.customerList.search.key,
				searchCondition: this.$store.state.customerList.search.condition
			}
		}
	}
</script>
<style type="text/css" scoped>
	.search-popup{
		height: 100%;
		width: 100%;
	}

	.search-popup > div > div{
		margin-top: 50px;
	}

	.search-area{
		margin-top: 45px;
		padding: 5px;
	}

	.search-area div{
		display: inline-block;
		margin-left: 5px;
		font-size: 15px;
	}

	.search-area span{
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

	.owner span, .address span{
		display: inline-block;
		font-size: 14px;
		color: #999;
		height: 20px;
		vertical-align: bottom;
	}

	.owner .vui-icon, .address .vui-icon{
		width: 20px;
		height: 20px;
		vertical-align: bottom;
	}
</style>