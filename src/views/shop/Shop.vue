<template>
  <div id="shop">
    <!-- 导航 -->
    <nav-bar class="shop-nav"><div slot="center">购物车({{shopLength}})</div></nav-bar>
    <!-- 商品展示 -->
    <shop-list />
    <!-- 总计 -->
    <shop-total />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import ShopList from "./childComs/ShopList"
import ShopTotal from "./childComs/ShopTotal"

// 导入辅助方法
import { mapGetters } from "vuex";

export default {
  name: "Shop",
  components: {
    NavBar,
    ShopList,
    ShopTotal
  },
  computed: {
    // 映射辅助方法，可以是对象写法
    ...mapGetters(['shopLength'])
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.shop-nav {
  background-color: palevioletred;
  color: #fff;
  font-size: 19px;
}
</style>