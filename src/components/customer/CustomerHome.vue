<template>
	<div>
		<mt-header fixed title="客户主页">
			<mt-button icon="back" slot="left" @click="goBack"></mt-button>
		</mt-header>
	</div>
</template>
<script type="text/javascript">
	import Vue from 'vue'
	import { Header } from 'mint-ui'

	Vue.component(Header.name, Header);

	export default{
		methods:{
			goBack: function () {
				this.$router.go(-1); 
			}
		}
	}

</script>
<style type="text/css" scoped>
	
</style>