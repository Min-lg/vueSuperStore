import { debounce } from "common/utils";
import BackTop from "components/content/backTop/BackTop";

// 详情展示混入
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

// 回到顶部混入
/**
 * 回到顶部minxin封装
 */
export const backTopMinxin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    backtop() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
};
