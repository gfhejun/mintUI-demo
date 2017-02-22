<template>
	<div>
		<mt-header fixed :title="title">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
			<span slot="right">
				<mt-button class="right-button" @click="edit" v-if="!isEdit">
					<vui-icon name="edit"></vui-icon>
				</mt-button>
				<mt-button class="right-button" @click="save" v-else>
					<vui-icon name="check"></vui-icon>
				</mt-button>
				<mt-button icon="more" @click="more" v-if="!isEdit"></mt-button>
  			</span>
		</mt-header>
		<mt-popup class="pick-popup"
  			v-model="pickPopupVisible"
  			:closeOnClickModal="false"
  			position="right">
  			<div style="height:100%">
  				<mt-header fixed :title="pickTitle">
  					<mt-button slot="left" icon="back" @click="closePickPopup"></mt-button>
  				</mt-header>
  				<div class="pick-content">
  					<div class="empty"></div>
  					<div class="spinner" v-if="loading">
						<mt-spinner type="triple-bounce" color="#26a2ff" :size="30"></mt-spinner>
					</div>
  					<mt-tab-container v-model="currentPickContentType">
  						<mt-tab-container-item id="type">
			          		<div v-for="item in types" class="pick-item" @click="chooseItem(item)">
  								{{item}}
  							</div>
			        	</mt-tab-container-item>
			        	<mt-tab-container-item id="customer">
			          		<div v-for="item in customers" class="pick-item" @click="chooseItem(item)">
			          			<div class="pick-item-title">{{item.name}}</div>
			          			<div class="pick-item-other">{{item.type}}</div>
			          			<div class="pick-item-other">{{item.detailedAddr}}</div>
			          		</div>
			        	</mt-tab-container-item>
			        	<mt-tab-container-item id="opportunity">
			          		<div v-for="item in opportunities" class="pick-item" @click="chooseItem(item)">
			          			<div class="pick-item-title">{{item.name}}</div>
			          			<div class="pick-item-other">{{item.businesstype}}</div>
			          			<div class="pick-item-type">{{item.requiredtype}}</div>
			          			<div class="pick-item-status">{{item.status}}</div>
			          		</div>
			        	</mt-tab-container-item>
			        	<mt-tab-container-item id="contact" @click="chooseItem(item)">
			          		<div v-for="item in contacts" class="pick-item">
			          			<div class="pick-item-title">{{item.name}}</div>
			          		</div>
			        	</mt-tab-container-item>
			      	</mt-tab-container>
  				</div>
  			</div>
		</mt-popup>
		<div class="main">
			<mt-field :value="description" label="主题" placeholder="请填写主题" type="textarea" rows="3"></mt-field>
			<mt-cell title="类型" is-link @click.native="openPickContentPopup('type')">
				{{type | longText(10)}}
			</mt-cell>
			<mt-cell title="开始时间" @click.native="openPickDatetimePopup('beginTime')">
				<span>{{beginTime | datetime}}</span>
				<vui-icon name="time"></vui-icon>
			</mt-cell>
			<mt-cell title="结束时间" @click.native="openPickDatetimePopup('overTime')">
				<span>{{overTime | datetime}}</span>
				<vui-icon name="time"></vui-icon>
			</mt-cell>
			<mt-cell title="客户" @click.native="openPickContentPopup('customer')">
				<span>{{customer.name | longText(10)}}</span>
				<vui-icon name="people"></vui-icon>
			</mt-cell>
			<mt-cell title="商机" @click.native="openPickContentPopup('opportunity')">
				<span>{{opportunity.name | longText(10)}}</span>
				<vui-icon name="recharge"></vui-icon>
			</mt-cell>
			<mt-cell title="联系人" @click.native="openPickContentPopup('contact')">
				<span>{{contact.name | longText(10)}}</span>
				<vui-icon name="people"></vui-icon>
			</mt-cell>
			<mt-datetime-picker
			    ref="datetimePicker"
			    type="datetime"
			    v-model="pickTime"
			    @confirm="confirmTime">
			</mt-datetime-picker>
		</div>
		<mt-actionsheet :actions="moreAction" v-model="moreVisible">
		</mt-actionsheet>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import { Header, MessageBox, Actionsheet, Field, Popup, Cell, DatetimePicker, TabContainer, TabContainerItem, Spinner} from 'mint-ui'
	import axios from 'axios'
	import config from '../../util/config'

	Vue.component(Header.name, Header);
	Vue.component(Actionsheet.name, Actionsheet);
	Vue.component(Field.name, Field);
	Vue.component(Popup.name, Popup);
	Vue.component(Cell.name, Cell);
	Vue.component(DatetimePicker.name, DatetimePicker);
	Vue.component(TabContainer.name, TabContainer);
	Vue.component(TabContainerItem.name, TabContainerItem);
	Vue.component(Spinner.name, Spinner);

	export default{
		methods:{
			//返回
			goBack: function () {
				this.$router.go(-1); 
			},
			//加载活动详情
			loadActivity: function () {
				if (this.$route.params.id == undefined || this.$route.params.id == ''){
					this.title = '新建活动';
				}else{
					this.title = '活动详情';

					this.loading = true;
					var config = {
						params:{
							actionId: this.$route.params.id
						}
					}
					axios.get(this.url, config)
					.then((response) => {
						this.loading = false;

						if (response.status == 200) {
							console.log(response);
							var result = response.data.result;
							this.description = result.description;
							this.type = result.type;
							this.beginTime = result.plannedDate;
							this.overTime = result.completedDate;
							this.customer.name = result.accountName;
							this.opportunity.name = result.opportunity;
							this.contact.name = result.primaryContactName;
						}

						this.loading = false;

					}, (response) => {
						this.loading = false;
						console.log('出现问题:' + response);
					})
				}
			},
			//进入编辑状态
			edit: function () {
				this.isEdit = true;
			},
			//保存
			save: function () {
				this.isEdit = false;
			},
			//更多操作
			more: function () {
				this.moreVisible = true; 
			},
			//关闭选择内容窗口
			closePickPopup: function () {
				this.pickPopupVisible = false;
			},
			//打开选择内容窗口
			openPickContentPopup: function (type) {
				if (!this.isEdit){
					return;
				}
				this.currentPickContentType = type;
				if (type == 'type'){
					this.pickTitle = '请选择类型';
					this.pickList = this.types;
				}else if (type == 'customer'){
					this.pickTitle = '请选择客户';
					if (this.customers.length < 1){
						this.getCustomers();
					}
				}else if (type == 'opportunity'){
					this.pickTitle = '请选择商机';
					if (this.opportunities.length < 1){
						this.getOpportunities();
					}
				}else if (type == 'contact'){
					this.pickTitle = '请选择联系人';
					if (this.contacts.length < 1){
						this.getContacts();
					}
				}

				this.pickPopupVisible = true;
			},
			//打开选择时间窗口
			openPickDatetimePopup: function (type) {
				if (!this.isEdit){
					return;
				}
				this.currentPickTimeType = type;
				if (type == 'beginTime'){
					if (this.beginTime == ''){
						this.pickTime = new Date();
					}else{
						this.pickTime = this.beginTime;
					}
				} else if (type == 'overTime'){
					if (this.overTime == ''){
						this.pickTime = new Date();
					}else{
						this.pickTime = this.overTime;
					}
				}

				this.$refs.datetimePicker.open();
			},
			//确认选择时间
			confirmTime: function () {
				if (this.currentPickTimeType == 'beginTime'){
					this.beginTime = this.pickTime;
				}else if (this.currentPickTimeType == 'overTime'){
					this.overTime = this.pickTime;
				}
			},
			getCustomers: function () {
				this.loading = true;
				var config = {
					params:{
						page: this.customerPage,
						rows: 20,
						userOrgId: this.user.orgId,
						userPositionId: this.user.postId,
						searchText:''
					}
				}
				axios.get(this.customerUrl, config)
				.then((response) => {
					this.loading = false;

					if (response.status == 200) {
						this.customers = response.data.rows;
					}

					this.loading = false;

				}, (response) => {
					this.loading = false;
					console.log('出现问题:' + response);
				})
			},
			getOpportunities: function () {
				this.loading = true;
				var config = {
					params:{
						empId: this.user.id,
						page: this.opportunityPage,
						rows: 20,
						userOrgId: this.user.orgId,
						userPositionId: this.user.postId,
						searchText:''
					}
				}
				axios.get(this.opportunityUrl, config)
				.then((response) => {
					this.loading = false;

					if (response.status == 200) {
						this.opportunities = response.data.rows;
					}

					this.loading = false;

				}, (response) => {
					this.loading = false;
					console.log('出现问题:' + response);
				})
			},
			getContacts: function () {
				this.loading = true;
				var config = {
					params:{
						page: this.contactPage,
						rows: 20,
						userOrgId: this.user.orgId,
						userPositionId: this.user.postId,
						searchText:''
					}
				}
				axios.get(this.contactUrl, config)
				.then((response) => {
					this.loading = false;

					if (response.status == 200) {
						this.contacts = response.data.rows;
					}

					this.loading = false;

				}, (response) => {
					this.loading = false;
					console.log('出现问题:' + response);
				}) 
			},
			chooseItem: function (item) {
				if (this.currentPickContentType == 'type'){
					this.type = item;
				}
				else if (this.currentPickContentType == 'customer'){
					this.customer = item;
				}else if (this.currentPickContentType == 'opportunity'){
					this.opportunity = item;
				}else if (this.currentPickContentType == 'contact'){
					this.contact = item;
				}
				this.pickPopupVisible = false;
			}
		},
		data(){
			return{
				loading: false,
				user: this.$store.getters.getUserInfo, //当前用户
				url: config.config.url.activityDetail, //访问路径
				customerUrl: config.config.url.activityCustomer, //获取客户路径
				customerPage: 1, //当前客户列表页码
				opportunityUrl: config.config.url.host + config.config.url.activityOpportunity, //获取商机路径
				opportunityPage: 1, //当前商机列表页码
				contactUrl: config.config.url.activityContact, //获取联系人路径
				contactPage: 1, //当前联系人列表页码
				title: '活动详情', //页面标题
				isEdit: false, //编辑状态
				moreVisible: false, //更多操作
				moreAction: [ //更多操作的内容
					{	
						name: '活动完成',
						method:function () {
							console.log('活动完成');
						}
					},{
						name: '活动终止',
						method:function () {
							console.log('活动终止');
						}
					} 
				],
				pickTitle: '', //选择内容窗口标题
				pickList: [], //选择内容列表
			    pickPopupVisible: false, //选择内容窗口的可见性
				types: ['拜访', '会议沟通', '电话沟通', '邮件沟通', '短信通知', '通知', '专家会诊', '路演', '预路演', '产品推介', '服务推介', '持续督导', '面谈', '业务推介', '客户培训活动', '其他'],
			    type: '', //类型
			    beginTime: '', //开始时间
			    overTime: '', //结束时间
			    currentPickTimeType: '', //当前选择时间的类型
			    currentPickContentType: '', //当前选择内容的类型
			    pickTime: '', //当前选择时间
			    description: '', //主题
			    customer: {}, //客户
			    customers: [], //客户列表
			    opportunity: {}, //商机
			    opportunities: [], //商机列表
			    contact: {}, //联系人
			    contacts: [] //联系人列表
			}
		},
		beforeRouteEnter (to, from, next) {
		    next(vm => {
		    	vm.loadActivity();
  			})
		}
	}
</script>
<style type="text/css" scoped>
	.main{
		margin-top: 40px;
	}

	.right-button{
		margin-right: 5px;
		vertical-align: middle;
	}

	.right-button .vui-icon{
    	fill: white;
    	width: 20px;
    	height: 20px;
	}

	.pick-popup{
		height: 100%;
		width: 100%;
	}

	.empty{
		height: 40px;
	}

	.pick-content{
		overflow-y: auto;
		height: 100%;
	}

	.pick-item{
		border-bottom: 1px solid #ddd;
		padding: 5px 20px;
	}

	.pick-item-name{
		word-break: break-all;
	}

	.pick-item-other{
		word-break: break-all;
		color: #999;
		font-size: 14px;
	}

	.pick-item-type{
		border: 1px solid #00a0e2;
   		color: #00a0e2;
   		border-radius: 3px;
   		padding: 0 3px;
   		display: inline-block;
		font-size: 12px;
	}

	.pick-item-status{
		border: 1px solid red;
   		color: red;
   		border-radius: 3px;
   		padding: 0 3px;
   		display: inline-block;
		font-size: 12px;
	}

	.mint-cell .vui-icon{
		margin-left: 5px;
		width: 20px;
		height: 20px;
	}

	.spinner{
		height: 100%;
		width: 100%;
		text-align: center;
		padding-top: 100px;
	}

</style>