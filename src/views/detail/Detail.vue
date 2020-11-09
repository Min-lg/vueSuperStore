<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="detailTitleClick"
      ref="nav"
    />

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="detailScroll">
      <!-- 切记，给子组件传值时，驼峰名命要用-连接 -->
      <detail-swiper :top-images="topImages" />
      <detail-goods :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @loadImgEvent="imgLoadList"
      />
      <detail-params ref="params" :paramInfo="paramInfo" />
      <detail-comment ref="comment" :comment="comment" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <back-top @click.native="backtop" v-show="isShowBackTop" />
    <detail-bottom-bar @addEvent="addToCart" />
  </div>
</template>
<script>
import DetailNavBar from "./childComs/DetailNavBar";
import DetailSwiper from "./childComs/DetailSwiper";
import DetailGoods from "./childComs/DetailGoods";
import DetailShopInfo from "./childComs/DetailShopInfo";
import DetailGoodsInfo from "./childComs/DetailGoodsInfo";
import DetailParams from "./childComs/DetailParams.vue";
import DetailComment from "./childComs/DetailComment.vue";
import DetailBottomBar from "./childComs/DetailBottomBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getDetailRecommend,
} from "network/detail";
// 引入混入文件
import { itemListenerMixin, backTopMinxin } from "common/mixin";
// 防抖
import { debounce } from "common/utils";
// 辅助函数
import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoods,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParams,
    DetailComment,
    DetailBottomBar,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMinxin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      comment: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  created() {
    // 取到当前激活路由对象下的params的值
    this.iid = this.$route.params.id;
    // 请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.data.result;
      // 获取轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息，通过构造器解析数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //获取宝贝的详细信息
      this.detailInfo = data.detailInfo;
      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论
      if (data.rate.cRate != 0) {
        this.comment = data.rate.list[0];
      }
      // 获取推荐数据
      this.getDetailRecommend();

      // 使用$nextTick方法,组件的dom渲染完成
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });
    // 给getThemeTopY赋值,并添加防抖,在图片加载完成后调用函数
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 45);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 45);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 45);
      this.themeTopYs.push(Number.MAX_VALUE); //JS中的最大值
    }, 100);
  },
  destroyed() {
    // 取消全局事件监听,事件名，要取消的方法，如不传入要取消的函数，则全局取消，这里不能，detail要用
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoadList() {
      // 监听子组件图片加载,目的:刷新scroll
      this.refresh();
      // 调用getThemeTopY
      this.getThemeTopY();
    },
    // 获取推荐数据
    async getDetailRecommend() {
      let res = await getDetailRecommend();
      this.recommend = res.data.data.list;
    },
    // 当前navbar点击的下标元素
    detailTitleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 监听scroll
    detailScroll(res) {
      // 获取Y的值
      const resY = -res.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          resY >= this.themeTopYs[i] &&
          resY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShowBackTop = resY > 1000;
    },
    // 添加到购物车
    addToCart() {
      //把信息发送到vuex里
      const obj = {
        iid: this.iid,
        desc: this.goods.desc,
        price: this.goods.lowNowPrice,
        title: this.goods.title,
        img: this.topImages[0],
      };
      // 分发vuex  actions进行逻辑运算
      // this.$store.dispatch("addCart", obj);
      this.addCart(obj).then(res=>{
        // 调用已注册模板组件
        this.$toast.show(res,1200)
      })
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 2.09rem);
}
</style>