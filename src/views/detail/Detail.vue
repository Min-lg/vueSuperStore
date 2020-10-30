<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <!-- 切记，给子组件传值时，驼峰名命要用-连接 -->
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-goods :goods="goods"></detail-goods>
    <detail-shop-info :shop="shop" />
  </div>
</template>
<script>
import DetailNavBar from "./childComs/DetailNavBar";
import DetailSwiper from "./childComs/DetailSwiper";
import DetailGoods from "./childComs/DetailGoods";
import DetailShopInfo from "./childComs/DetailShopInfo";

import { getDetail, Goods,Shop } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoods,
    DetailShopInfo,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
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
      this.shop = new Shop(data.shopInfo)
    });
  },
  methods: {},
};
</script>
<style scoped>
</style>