<template>
	<div>
		<div v-for="items in uiItems">
			<div class="grid-item" v-for="item in items" @click="goto(item.link)">
				<img class="grid-icon" :src="require('../../assets/' + item.icon)">
				<div class="grid-content">
	              {{item.name}}
	            </div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import {MessageBox} from 'mint-ui';

	export default{
		components:{
			
		},
		methods:{
			goto: function (link) {
				if (link == ''){
					MessageBox('提示', '功能开发中，敬请期待！');
				}else{
					this.$router.push('/' + link); 
				}
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
				uiItems:[]
			}
		}
	}
</script>
<style type="text/css" scoped>
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
</style>