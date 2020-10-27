<template>
  <div ref="wrapper" class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// 引入better-scroll
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    scrollTo(x,y,time=300) {
      this.scroll.scrollTo(x,y,time)
    }
  },
  mounted() {
    
  },
  beforeUpdate() {
    setTimeout(() => {
      // console.log(this.$refs.wrapper)
      // console.log(document.querySelector('.wrapper'));
      this.scroll = new BScroll(this.$refs.wrapper, {
        // pullUpLoad: true,
        // scrollbar: true,
        // pullDownRefresh: true,
        click: true,
      });
    },200);
  }
};
</script>
<style scoped>
</style>