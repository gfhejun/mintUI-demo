<template>
  <div>
    <mt-header fixed :title="selected">
      <img class="chart" slot="right" src="../../assets/chart.png" @click="changeChartStatus" v-show="selected=='主页'">
    </mt-header>
    <div class="container">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="主页">
          <main-page :show="showChart"></main-page>
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
        <vui-icon slot="icon" name="home"></vui-icon>
        主页
      </mt-tab-item>
      <mt-tab-item id="消息">
        <vui-icon slot="icon" name="message"></vui-icon>
        消息
      </mt-tab-item>
      <mt-tab-item id="设置">
        <vui-icon slot="icon" name="settings"></vui-icon>
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
  methods:{
    changeChartStatus: function () {
       this.showChart = !this.showChart;
    }
  },
  data () {
    return {
      selected: this.$store.getters.getCurrentHomePage,
      showChart: true
    }
  },
  watch: {
    selected: function (newValue) {
      this.$store.commit('changeHomeTab', newValue);
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

  .chart{
    height: 20px;
    width: 20px;
    color: white;
  }
</style>
