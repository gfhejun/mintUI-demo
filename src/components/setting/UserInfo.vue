<template>
	<div>
		<mt-header fixed title="个人信息">
			<router-link to="/" slot="left">
    			<mt-button icon="back"></mt-button>
  			</router-link>
		</mt-header>
		<div class="info">
			<div>
				<img src="../../assets/avatar.png" @click="changeAvatar">
			</div>
			<div>
				<mt-cell title="姓名" v-model="user.username"></mt-cell>
				<mt-cell title="账号" v-model="user.loginId"></mt-cell>
				<mt-cell title="部门" v-model="user.orgName"></mt-cell>
				<mt-cell title="职位" v-model="user.postName"></mt-cell>
			</div>
		</div>
		<mt-actionsheet :actions="actions" v-model="sheetVisible">
		</mt-actionsheet>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import { Header, Cell, Actionsheet } from 'mint-ui'

	Vue.component(Header.name, Header);
	Vue.component(Cell.name, Cell);
	Vue.component(Actionsheet.name, Actionsheet);

	export default{
		methods:{
			changeAvatar:function () {
				this.sheetVisible = true;
			}
		},
		data(){
			return{
				actions: [
					{	
						name: '拍摄上传头像',
						method:function () {
							console.log('拍摄上传头像');
						}
					},{
						name: '从手机图库选择头像',
						method:function () {
							console.log('从手机图库选择头像');
						}
					} 
				],
				sheetVisible: false,
				user: this.$store.getters.getUserInfo
			}
		}
	}
</script>
<style type="text/css" scoped>
	.info{
		margin-top: 40px;
		width: 100%;
		padding-top: 10px;
	}

	.info > div:first-child{
		text-align: center;
	}

	.info > div img{
		width: 80px;
		height: 80px;
	}

</style>