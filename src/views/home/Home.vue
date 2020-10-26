<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播 -->
    <home-swiper :banners="banners" />
    <!-- 推荐 -->
    <recommend-view :recommend="recommend" />
    <!-- Feature -->
    <feature-view />
    <!-- tab-control -->
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" />
    <!-- goods -->
    <goods-list :goods="goods['pop'].list" />
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
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
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
        this.goods[type].list.push(...res.data.data.list);
        console.log(this.goods[type].list);
      });
    },
  },
};
</script>
<style scoped>
#home {
  padding-top: 44px;
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
}
</style>