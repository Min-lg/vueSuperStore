<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="" />
      <img
        slot="item-icon-select"
        src="~assets/img/tabbar/selecthome.svg"
        alt=""
      />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/classify" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/classify.svg" alt="" />
      <img
        slot="item-icon-select"
        src="~assets/img/tabbar/selectclassify.svg"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shop" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/shop.svg" alt="" />
      <img
        slot="item-icon-select"
        src="~assets/img/tabbar/selectshop.svg"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/my" activeColor="red">
      <img slot="item-icon" src="~assets/img/tabbar/my.svg" alt="" />
      <img
        slot="item-icon-select"
        src="~assets/img/tabbar/selectmy.svg"
        alt=""
      />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
</style>