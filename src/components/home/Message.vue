<template>
	<div>
		<mt-cell is-link title="我的待办">
	      <img class="setting-cell" slot="icon" src="../../assets/todo.png" width="30" height="30">
	      <mt-badge size="normal" type="error" class="badge">30</mt-badge>
	    </mt-cell>
	    <mt-cell is-link title="消息通知">
	      <img class="setting-cell" slot="icon" src="../../assets/notification.png" width="30" height="30">
	      <mt-badge size="normal" type="error" class="badge">10</mt-badge>
	    </mt-cell>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import {Badge} from 'mint-ui';

	Vue.component(Badge.name, Badge);
</script>

<style type="text/css" scoped>
	.setting-cell{
    	margin: 0 10px 0 20px;
  	}
</style>