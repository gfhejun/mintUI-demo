<template>
  <div>
    <mt-header fixed :title="selected"></mt-header>
    <div class="container">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="主页">
          <main-page></main-page>
        </mt-tab-container-item>
        <mt-tab-container-item id="消息">
          <message></message>
        </mt-tab-container-item>
        <mt-tab-container-item id="设置">
          <setting></setting>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="主页">
        <img slot="icon" src="../../assets/home.png">
        主页
      </mt-tab-item>
      <mt-tab-item id="消息">
        <img slot="icon" src="../../assets/message.png">
        消息
      </mt-tab-item>
      <mt-tab-item id="设置">
        <img slot="icon" src="../../assets/set.png">
        设置
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import {Tabbar, TabItem, TabContainer, TabContainerItem, Header} from 'mint-ui';
import MainPage from './MainPage'
import Message from './Message'
import Setting from './Setting'

Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);

export default {
  components: {
    MainPage,
    Message,
    Setting
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
</style>
