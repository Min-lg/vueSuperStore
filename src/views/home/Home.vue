<template>
  <div id="home">
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 轮播 -->
    <home-swiper :banners="banners"/>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childcomponents/HomeSwiper"

import { getHomeMultidata } from "network/home.js";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper
  },
  data() {
    return {
      banners: [],
    };
  },
  methods: {},
  created() {
    getHomeMultidata().then((res) => {
      this.banners = res.data.data.banner.list;
      console.log(this.banners);
      console.log(666);
    });
  }
};
</script>
<style scoped>
.home-nav {
  background-color: palevioletred;
  color: #fff;
  font-size: 19px;
}
</style>