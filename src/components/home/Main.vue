<template>
	<div>
		<div class="grid-row">
	        <div class="grid-item">
	          <img class="grid-icon" src="../../assets/search.png">
	          <div class="grid-content">
	            客户查询
	          </div>
	        </div>
	        <div class="grid-item">
	          <img class="grid-icon" src="../../assets/customer.png">
	          <div class="grid-content">
	            我的客户
	          </div>
	        </div>
	        <div class="grid-item">
	          <img class="grid-icon" src="../../assets/opportunity.png">
	          <div class="grid-content">
	            我的商机
	          </div>
	        </div>
      	</div>
		<div class="grid-row">
			<div class="grid-item">
			  <img class="grid-icon" src="../../assets/activity.png">
			  <div class="grid-content">
			    我的活动
			  </div>
			</div>
			<div class="grid-item">
			  <img class="grid-icon" src="../../assets/worktime.png">
			  <div class="grid-content">
			    我的工时
			  </div>
			</div>
			<div class="grid-item">
			  <img class="grid-icon" src="../../assets/schedule.png">
			  <div class="grid-content">
			    我的日程
			  </div>
			</div>
		</div>
        <div class="grid-row">
          <div class="grid-item">
            <img class="grid-icon" src="../../assets/salesopportunity.png">
            <div class="grid-content">
              交叉销售
            </div>
          </div>
        </div>
	</div>
</template>
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