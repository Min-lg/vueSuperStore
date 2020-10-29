<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabControl"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabControlTop"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scrollY"
      :pull-up-load="true"
      @pullingUp="moreDate"
    >
      <!-- 轮播 -->
      <home-swiper :banners="banners" @imageLoad="swiperImageLoad" />
      <!-- 推荐 -->
      <recommend-view :recommend="recommend" />
      <!-- Feature -->
      <feature-view />
      <!-- tab-control -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabControl"
        ref="tabControl2"
      />
      <!-- goods -->
      <goods-list :goods="showGoods" />
    </scroll>

    <!-- backtop -->
    <back-top @click.native="backtop" v-show="isShowBackTop" />
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
import BackTop from "components/content/backTop/BackTop";

// 工具导入
import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { debounce } from "common/utils";

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
    BackTop,
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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabControlTop: false,
    };
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1、防抖
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    // 监听item的image加载完成
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
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
      // 保证俩个tabcontrol的当前点击样式同步
      this.$refs.tabControl1.currentIndex = res;
      this.$refs.tabControl2.currentIndex = res;
    },
    // 回到顶部
    backtop() {
      // 当前ref为scroll的对象的scrollTo方法
      this.$refs.scroll.scrollTo(0, 0);
    },
    // 监听滚动距离
    scrollY(res) {
      // 是否显示backtop组件
      this.isShowBackTop = -res.y > 1000;
      // 是否让tabcontrol具备吸顶属性,滚动距离与tabcontrol距顶部的距离进行比较
      this.isTabControlTop = -res.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    moreDate() {
      this.getHomeGoods(this.currentType);
      // 重新计算scroll高度
      this.$refs.scroll.refresh();
    },
    // 监听swiper图片加载完成
    swiperImageLoad() {
      // 保存当前tabcontrol目标控件到上级层的距离，包括border
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
        this.goods[type].page += 1;
        // 刷新scroll
        this.$refs.scroll.finishPullUp();
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
  /* padding-top: 44px; */
  position: relative;
  height: 100vh;
}
.home-nav {
  background-color: palevioletred;
  color: #fff;
  font-size: 19px;
  /* 在浏览器原生滚动时生效，better-scroll中不生效 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999; */
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>