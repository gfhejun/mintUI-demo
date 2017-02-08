<template>
	<div>
		<mt-header fixed title="客户查询">
			<router-link to="/" slot="left">
    			<mt-button icon="back"></mt-button>
  			</router-link>
		</mt-header>
		<div class="searchbar">
			<input type="text" placeholder="请输入客户名称" v-model="searchkey">
			<mt-button class="searchbtn" type="primary" size="small" @click.native="search">搜索</mt-button>
		</div>
		<div class="list-content">
			<div class="spinner" v-if="loading">
				<mt-spinner type="triple-bounce" color="#26a2ff" :size="30"></mt-spinner>
			</div>
			<div class="list-item" v-for="item in result" v-if="!loading">
				<div class="left">
					<div class="customer">{{item.name}}</div>
					<div class="serve-team">
						<img src="../../assets/user.png">
						<span>{{item.serve_team}}</span>
					</div>
				</div>
				<div class="right">
					<img v-if="item.is_visited==0" src="../../assets/star.png" @click="focus(item.name)">
					<img v-if="item.is_visited==1" src="../../assets/star_yellow.png">	
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import {Header, Search, Button, MessageBox, Spinner} from 'mint-ui'
	import axios from 'axios'
	import config from '../../util/config'

	Vue.component(Header.name, Header);
	Vue.component(Search.name, Search);
	Vue.component(Button.name, Button);
	Vue.component(Spinner.name, Spinner);

	export default{
		methods:{
			search: function () {
				if (this.loading){
					return;
				}
				this.loading = true;
				var httpConfig = {
					params: {
    					dataSource: 'siebel',
    					searchKey: this.searchkey,
    					postnId: "1-5A-4576"
  					}
				}

				var url = config.config.url.host + config.config.url.customerSearch;
				axios.get(url, httpConfig)
				.then((response) =>{
					this.loading = false;
					if (response.status == 200){
						this.result = response.data.data.items;
					}
				}, (response) => {
					this.loading = false;
					console.log('出现问题:' + response);
				})
			},
			focus: function (customer) {
				 MessageBox({
				  title: '列入潜在客户',
				  message: '是否将【' + customer + '】列入潜在客户?',
				  showCancelButton: true
				});
			}
		},
		data(){
			return{
				result: [],
				searchkey: '',
				loading: false
			}
		}
	}
</script>
<style type="text/css" scoped>
	.searchbar{
		margin-top: 40px;
	}

	.searchbar input{
		margin: 5px 0 0 5px;
		border: 1px solid #ddd;
		border-radius: 5px;
		padding: 10px;
		width: 70%;
		font-size: 13px;
	}

	.spinner{
		height: 100%;
		width: 100%;
		text-align: center;
		padding-top: 100px;
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

	.list-item{
		border-bottom: 1px solid #ddd;
	}

	.left{
		padding: 10px 0 10px 10px;
		display: inline-block;
		width: 80%;
	}

	.right{
		display: inline-block;
		width: 15%;
		text-align: center;
	}

	.right img{
		width: 25px;
		height: 25px;
	}

	.serve-team img{
		width: 25px;
		height: 25px;
		vertical-align: bottom;
	}

	.serve-team span{
		vertical-align: middle;
		font-size: 15px;
		color: #999;
	}
</style>