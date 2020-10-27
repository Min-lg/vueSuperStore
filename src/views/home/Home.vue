<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content" ref="scroll">
      <!-- 轮播 -->
      <home-swiper :banners="banners" />
      <!-- 推荐 -->
      <recommend-view :recommend="recommend" />
      <!-- Feature -->
      <feature-view />
      <!-- tab-control -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabControl"
      />
      <!-- goods -->
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- backtop -->
    <back-top @click.native="backtop"/>
  </div>
</template>
<script>
// 公共文件导入
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childcomponents/HomeSwiper";
import RecommendView from "./childcomponents/RecommendView";
import FeatureView from "./childcomponents/FeatureView";

// 页面导入
import TabControl from "components/content/tabControl/TabControl";
// goods
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backTop/BackTop"

// 工具导入
import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /* 
      事件相关方法
    */
    //  商品control
    tabControl(res) {
      switch (res) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    // 回到顶部
    backtop() {
      // 当前ref为scroll的对象的scrollTo方法
      this.$refs.scroll.scrollTo(0,0)
    },

    /* 
      网络请求相关方法
    */
    // 获取轮播数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // 获取网络数据保存至本地
        this.banners = res.data.data.banner.list;
        this.recommend = res.data.data.recommend.list;
      });
    },
    // 获取商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // ...的含义是数组的解构，解构后添加
        this.goods[type].list.push(...res.data.data.list);
      });
    },
  },
  // 计算属性
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>
<style scoped>
#home {
  padding-top: 44px;
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: palevioletred;
  color: #fff;
  font-size: 19px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>