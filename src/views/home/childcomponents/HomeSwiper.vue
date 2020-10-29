<template>
  <swiper>
    <swiper-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false,
    };
  },
  methods: {
    imageLoad() {
      // 不需要debounce：debounce是控制事件在一定时间内最后执行一次，而这里，图片加载后只执行一次即可，所以使用变量控制
      if (!this.isLoad) {
        this.$emit("imageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>
<style scoped>
</style>