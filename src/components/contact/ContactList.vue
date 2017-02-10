<template>
	<div>
		<mt-header fixed title="我的客户">
			<router-link to="/" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="list-content">
			<mt-cell-swipe title="测试左滑菜单"
			  :right="
			  [
			    {
			    	content: '删除',
			    	style: {background: 'red', color: 'white'},
			        handler: () => this.$messagebox('delete')
			    },{
			    	content: '电话',
			    	style: {background: '#26a2ff', color: 'white'},
			        handler: () => this.$messagebox('delete')
			    },{
			    	content: '短信',
			    	style: {background: 'grey', color: 'white'},
			        handler: () => this.$messagebox('delete')
			    }
			  ]
			  ">
			</mt-cell-swipe>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import { CellSwipe, Header, Button } from 'mint-ui'

	Vue.component(CellSwipe.name, CellSwipe);
	Vue.component(Header.name, Header);
	Vue.component(Button.name, Button);

	export default{
		data(){
			return{
			}
		}
	}
</script>
<style type="text/css" scoped>
	.list-content{
		position: absolute;
		top: 40px;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow-y: auto;
		border-top: 1px solid #ddd;
		word-break: break-all;
	}
</style>