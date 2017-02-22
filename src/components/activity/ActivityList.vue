<template>
	<div>
		<mt-header fixed title="活动管理">
			<mt-button icon="back" slot="left" @click="back"></mt-button>
  			<span slot="right">
				<mt-button icon="search" @click="search"></mt-button>
				<mt-button class="add" @click="showActivityDetail">
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
					  title="活动状态"
					  v-model="actionStatus"
					  :options="actionStatusOptions">
					</mt-radio>
					<mt-radio
					  title="活动归属"
					  v-model="belongTo"
					  :options="belongToOptions">
					</mt-radio>
					<mt-field placeholder="输入活动名称搜索（支持模糊匹配）" v-model="searchKey" style="margin-top:30px"></mt-field>
  				</div>
  			</div>
		</mt-popup>
		<div class="search-area">
			<div class="title">筛选:</div>
			<span>{{actionStatus}}</span>
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
			<div class="list-item" v-for="item in list" @click="showActivityDetail(item.id)">
				<div>
					<span class="description">{{item.description}}</span>
				</div>
				<div class="customer" v-if="item.accountname">
					<vui-icon name="people"></vui-icon>
				    <span>{{item.accountname | longText(18)}}</span>
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
	import { Header, MessageBox, Spinner, InfiniteScroll, Popup, Radio, Field} from 'mint-ui'
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
				this.$store.commit('resetActivityListSearch');
				this.$router.replace({path: '/'});
			},
			initList: function () {
				 return {
                    url: config.config.url.host + config.config.url.activityList,
                    config: {
                    	params: {
	    					actionStatus: this.actionStatus,
	    					empId: this.user.id,
	    					orderText: 1,
	    					userOrgId: this.user.orgId,
	    					userPositionId: this.user.postId,
	    					page: this.page,
	    					orderBy: 'created',
	    					visibility: this.belongTo
	  					}
  					}
                }
			},
			search: function () {
				this.searchPopupVisible = true;
			},
			closeSearchPopup: function () {
				if (this.searchCondition.actionStatus != this.actionStatus
					|| this.searchCondition.belongTo != this.belongTo
					|| this.searchCondition.searchKey != this.searchKey){

					var search = {
						condition: {
							actionStatus: this.actionStatus,
							belongTo: this.belongTo,
							key: this.searchKey
						},
						key: this.searchKey,
						actionStatus: this.actionStatus,
						belongTo: this.belongTo
					};
					this.$store.commit('updateActivityListSearch', search);

					var config = {
						params: {
	    					actionStatus: this.actionStatus,
	    					empId: this.user.id,
	    					orderText: 1,
	    					userOrgId: this.user.orgId,
	    					userPositionId: this.user.postId,
	    					page: 1,
	    					orderBy: 'created',
	    					visibility: this.belongTo
	  					}
  					}

					this.loadData(config);
				}

				this.searchPopupVisible = false;
			},
			//进入活动详情
			showActivityDetail: function (id) {
				this.$router.push({ name: 'activitydetail', params: { id: id}});
			},
		},
		data(){
			return{
				user: this.$store.getters.getUserInfo,
				searchPopupVisible: false,
				actionStatus: this.$store.state.activityList.search.actionStatus,
				actionStatusOptions: ['全部', '进行中', '已完成', '已取消'],
				belongTo: this.$store.state.activityList.search.belongTo,
				belongToOptions: ['我的活动', '我团队的活动'],
				searchKey: this.$store.state.activityList.search.key,
				searchCondition: this.$store.state.activityList.search.condition
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

	.description{

	}

	.customer span{
		display: inline-block;
		font-size: 14px;
		color: #999;
		height: 20px;
		vertical-align: bottom;
	}

	.customer .vui-icon{
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