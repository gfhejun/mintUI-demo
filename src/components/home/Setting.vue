<template>
	<div>
	  <mt-cell is-link title="个人信息">
        <img class="setting-cell" slot="icon" src="../../assets/user.png" width="30" height="30">
      </mt-cell>
      <mt-cell is-link title="切换职位">
        <img class="setting-cell" slot="icon" src="../../assets/post.png" width="30" height="30">
      </mt-cell>
      <mt-cell is-link title="意见反馈">
        <img class="setting-cell" slot="icon" src="../../assets/feedback.png" width="30" height="30">
      </mt-cell>
      <mt-cell title="版本更新">
        <img class="setting-cell" slot="icon" src="../../assets/update.png" width="30" height="30">
      </mt-cell>
      <mt-button class="logout-btn" type="danger">退出登录</mt-button>
	</div>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import {Cell, Button} from 'mint-ui';

	Vue.component(Cell.name, Cell);
	Vue.component(Button.name, Button);
</script>

<style type="text/css" scoped>
  .setting-cell{
    margin: 0 10px 0 20px;
  }

  .logout-btn{
    width: 90%;
    margin: 30px 5% 0 5%;
  }
</style>