<template>
	<div>
		<transition name="fade">
		    <div class="chart" id="chart" v-show="show">
		    </div>
		</transition>
		
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
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import {MessageBox, Spinner} from 'mint-ui'
	import axios from 'axios'
	import config from '../../util/config'
	import Highcharts from 'highcharts';
	require('highcharts/modules/exporting')(Highcharts);

	Vue.component(Spinner.name, Spinner);

	export default{
		props:['show'],
		components:{
			
		},
		methods:{
			goto: function (link) {
				if (link == ''){
					MessageBox('提示', '功能开发中，敬请期待！');
				}else{
					this.$router.push('/' + link); 
				}
			},
			initChart: function () {
				this.loading = true;
				var config = {
					params:{
						posId: this.user.postId
					}
				}

				axios.get(this.url + "my", config)
					.then((response) => {
						if (response.status == 200) {
							this.$store.commit('updateHomeChartOption', 
								[[response.data.account_count.active,
								response.data.served_account_count.active],
								[response.data.account_count.potential,
								response.data.served_account_count.potential]]);
							Highcharts.chart('chart', this.$store.getters.getHomeChartOption);
						}

					}, (response) => {
						this.loading = false;
						console.log('出现问题:' + response);
					})
			}
		},
		created () {
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

			this.initChart();
		},
		data(){
			return{
				items:[
					{name:'客户查询',icon:'search.png',link:'customersearch',show:true},
					{name:'客户管理',icon:'customer.png',link:'customerlist',show:true},
					{name:'商机管理',icon:'opportunity.png',link:'opportunitylist',show:true},
					{name:'活动管理',icon:'activity.png',link:'activitylist',show:true},
					{name:'工时管理',icon:'worktime.png',link:'',show:false},
					{name:'日程管理',icon:'schedule.png',link:'',show:false},
					{name:'交叉销售',icon:'salesopportunity.png',link:'',show:false},
					{name:'业务与产品',icon:'product.png',link:'',show:false}
				],
				uiItems:[],
				chart: null,
				url: config.config.url.host + config.config.url.report,
				user: this.$store.getters.getUserInfo //当前用户
			}
		},
		mounted() {
			// 创建图表
			Highcharts.chart('chart', this.$store.getters.getHomeChartOption)
	    }
	}
</script>
<style type="text/css" scoped>
  .chart{
  	padding: 10px 10px 0 10px;
	height: 250px;
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

  .items div:nth-child(1) > .grid-item{
  	border-top: 1px solid #ddd;
  }

  .grid-icon{
    width: 35px;
    height: 35px;
  }

  .grid-content{
    font-size: 15px;
  }

  .badge{
    float: right;
    margin-right: 5px;
  }

  .mint-msgbox-title{
  	color: #999 !important;
  }

  .mint-msgbox-message{
  	color: #333;
  }

  .fade-enter-active, .fade-leave-active {
	transition: opacity .5s
  }
  .fade-enter, .fade-leave-active {
	opacity: 0
  }
</style>