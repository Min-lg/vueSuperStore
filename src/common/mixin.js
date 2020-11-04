import { debounce } from "common/utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      refresh: null
    }
  },
  mounted() {
    // 1、防抖
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    // 保存当前监听的函数
    this.itemImgListener = () => {
      this.refresh()
    };
    // 监听item的image加载完成
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  }
}