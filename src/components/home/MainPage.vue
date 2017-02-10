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
	export default{
		components:{
			
		},
		methods:{
			goto: function (link) {
				this.$router.push('/' + link); 
			}
		},
		created () {
		    var temp = [];
			for (var i = 0,j = this.items.length,k = 1; i < j; i++){
				temp.push(this.items[i]);
				k++;
				if (k > 3){
					this.uiItems.push(temp);
					temp = [];
					k = 1;
				}

				if (i + 1 == j){
					this.uiItems.push(temp);
				}
			}
		},
		data(){
			return{
				items:[
					{name:'客户查询',icon:'search.png',link:'customersearch'},
					{name:'我的客户',icon:'customer.png',link:'contactlist'},
					{name:'我的商机',icon:'opportunity.png',link:'customersearch'},
					{name:'我的活动',icon:'activity.png',link:'activitylist'},
					{name:'我的工时',icon:'worktime.png',link:'customersearch'},
					{name:'我的日程',icon:'schedule.png',link:'customersearch'},
					{name:'交叉销售',icon:'salesopportunity.png',link:'customersearch'},
					{name:'业务与产品',icon:'product.png',link:'customersearch'}
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
</style>