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
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },

  mounted() {
    // 1、创建better-scroll实例
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 开启组件内点击
      click: true,
      // 是否监听滚动
      probeType: this.probeType,
      // 是否可以上拉加载
      pullUpLoad: this.pullUpLoad,
    });
    if (this.probeType == 2 || this.probeType == 3) {
      // 监听滚动
      this.scroll.on("scroll", (res) => {
        // 子组件事件传递，携带参数
        this.$emit("scroll", res);
      });
    }
    if (this.pullUpLoad) {
      // 监听上拉加载
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
};
</script>
<style scoped>
</style>