<template>
  <div>
    <mt-header fixed :title="selected"></mt-header>
    <div class="container">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="主页">
          <div class="grid-row">
            <div class="grid-item">
              <img class="grid-icon" src="../assets/search.png">
              <div class="grid-content">
                客户查询
              </div>
            </div>
            <div class="grid-item">
              <img class="grid-icon" src="../assets/customer.png">
              <div class="grid-content">
                我的客户
              </div>
            </div>
            <div class="grid-item">
              <img class="grid-icon" src="../assets/opportunity.png">
              <div class="grid-content">
                我的商机
              </div>
            </div>
          </div>
          <div class="grid-row">
            <div class="grid-item">
              <img class="grid-icon" src="../assets/activity.png">
              <div class="grid-content">
                我的活动
              </div>
            </div>
            <div class="grid-item">
              <img class="grid-icon" src="../assets/worktime.png">
              <div class="grid-content">
                我的工时
              </div>
            </div>
            <div class="grid-item">
              <img class="grid-icon" src="../assets/schedule.png">
              <div class="grid-content">
                我的日程
              </div>
            </div>
          </div>
          <div class="grid-row">
            <div class="grid-item">
              <img class="grid-icon" src="../assets/salesopportunity.png">
              <div class="grid-content">
                交叉销售
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="消息">
          <div class="grid-row">
            <div class="grid-item">
              <mt-badge size="small" type="error" class="badge">30</mt-badge>
              <img class="grid-icon" src="../assets/todo.png">
              <div class="grid-content">
                我的待办
              </div>
            </div>
            <div class="grid-item">
              <img class="grid-icon" src="../assets/notification.png">
              <mt-badge size="small" type="error" class="badge">20</mt-badge>
              <div class="grid-content">
                消息通知
              </div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="设置">
          <mt-cell is-link title="个人信息">
            <img class="setting-cell" slot="icon" src="../assets/user.png" width="30" height="30">
          </mt-cell>
          <mt-cell is-link title="切换职位">
            <img class="setting-cell" slot="icon" src="../assets/post.png" width="30" height="30">
          </mt-cell>
          <mt-cell is-link title="意见反馈">
            <img class="setting-cell" slot="icon" src="../assets/feedback.png" width="30" height="30">
          </mt-cell>
          <mt-cell title="版本更新">
            <img class="setting-cell" slot="icon" src="../assets/update.png" width="30" height="30">
          </mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="主页">
        <img slot="icon" src="../assets/home.png">
        主页
      </mt-tab-item>
      <mt-tab-item id="消息">
        <img slot="icon" src="../assets/message.png">
        消息
      </mt-tab-item>
      <mt-tab-item id="设置">
        <img slot="icon" src="../assets/set.png">
        设置
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import {Tabbar, TabItem, TabContainer, TabContainerItem, Cell, Header, Badge} from 'mint-ui';

Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Cell.name, Cell);
Vue.component(Badge.name, Badge);

export default {
  components: {
  },
  data () {
    return {
      selected: '主页'
    }
  }
}
</script>
<style type="text/css" scoped>
  .container{
    overflow: auto;
    position: absolute;
    top: 40px;
    bottom: 55px;
    width: 100%;
  }

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

  .setting-cell{
    margin: 0 10px 0 20px;
  }
</style>
