<template>
	<div>
		<mt-header fixed title="客户主页">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
		<div class="customer">
			<div class="logo">
				<img src='../../assets/company_logo.png'>
			</div>
			<div class="info">
				<div class="name">{{customer.name}}</div>
				<div class="address">
					<vui-icon name="location"></vui-icon>
					{{customer.office_addr}}
				</div>
				<div class="person">
					<vui-icon name="people"></vui-icon>
					{{customer.pr_postn_name}}
				</div>
			</div>
			<div class="items">
				<div v-for="items in uiItems">
					<div class="grid-item" v-for="item in items" @click="goto(item.link)">
						<img class="grid-icon" :src="require('../../assets/' + item.icon)">
						<div class="grid-content">
			              {{item.name}}
			            </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import { Header, MessageBox } from 'mint-ui'
	import axios from 'axios'
	import config from '../../util/config'

	Vue.component(Header.name, Header);

	export default{
		methods:{
			goBack: function () {
				this.$router.go(-1); 
			},
			loadCustomer: function (customerId) {
				this.loading = true;
				var config = {
					params:{
						postnId: this.user.postId
					}
				}
				axios.get(this.url + this.$route.params.id, config)
				.then((response) => {
					this.loading = false;

					if (response.status == 200) {
						this.customer = response.data.metrics[0];
					}

					this.loading = false;

				}, (response) => {
					this.loading = false;
					console.log('出现问题:' + response);
				})
			},
			initItems: function () {
				var temp = [];
				for (var i = 0,j = this.items.length,k = 1; i < j; i++){
					if (this.items[i].show){
						temp.push(this.items[i]);
						k++;
						if (k > 3){
							this.uiItems.push(temp);
							temp = [];
							k = 1;
						}
					}

					if (i + 1 == j){
						this.uiItems.push(temp);
					}
				} 
			},
			goto: function (link) {
				if (link == ''){
					MessageBox('提示', '功能开发中，敬请期待！');
				}else{
					
				}
			}
		},
		created(){
			this.loadCustomer();
			this.initItems();
		},
		data(){
			return{
				user: this.$store.getters.getUserInfo,
				loading: false,
				url: config.config.url.host + config.config.url.customer,
				customer: {},
				items:[
					{name:'客户信息',icon:'customer_info.png',link:'',show:true},
					{name:'联系人',icon:'contact.png',link:'',show:true},
					{name:'业务关系',icon:'business.png',link:'',show:true},
					{name:'活动管理',icon:'activity.png',link:'',show:true},
					{name:'客户关系管理团队',icon:'relationship.png',link:'',show:true}
				],
				uiItems:[]
			}
		},
		beforeRouteEnter (to, from, next) {
		    next(vm => {
		    	vm.loadCustomer();
  			})
		}
	}

</script>
<style type="text/css" scoped>
	.customer{
		margin-top: 40px;
		border-bottom: 1px solid #ddd;
	}

	.logo{
		display: inline-block;
		width: 30%;
		padding: 10px;
	}

	.logo img{
		width: 90px;
		height: 90px;
	}

	.info{
		display: inline-block;
		width: 60%;
		vertical-align: top;
		margin-top: 15px;
	}

	.info .name{
		font-size: 15px;
		line-height: 20px;
	}

	.info .address, .info .person{
		font-size: 14px;
		opacity: 0.4;
	}

	.address .vui-icon, .person .vui-icon{
		vertical-align: bottom;
    	width: 20px;
    	height: 20px;
	}

	.items{
		margin-top: 50px;
	}

	.grid-item{
	    display: inline-block;
	    width: 33%;
	    padding: 10px 0 5px 0;
	    border-bottom: 1px solid #ddd;
	    border-right: 1px solid #ddd;
	    text-align: center;
	    float: left;
	}

	.grid-icon{
	    width: 35px;
	    height: 35px;
	}

	.grid-content{
	    font-size: 13px;
	}
</style>