<template>
	<div class="grid-row">
	    <div class="grid-item">
	      <mt-badge size="small" type="error" class="badge">30</mt-badge>
	      <img class="grid-icon" src="../../assets/todo.png">
	      <div class="grid-content">
	        我的待办
	      </div>
	    </div>
	    <div class="grid-item">
	      <img class="grid-icon" src="../../assets/notification.png">
	      <mt-badge size="small" type="error" class="badge">20</mt-badge>
	      <div class="grid-content">
	        消息通知
	      </div>
	    </div>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import {Badge} from 'mint-ui';

	Vue.component(Badge.name, Badge);
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