<template>
  <div id="cart_list">
    <scroll ref="scroll" class="cart_scroll">
        <shop-list-item
          v-for="(item, index) in shopInfo"
          :key="index"
          :item="item"
        ></shop-list-item>
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll.vue";
import ShopListItem from "./ShopListItem";

// 导入辅助方法
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    Scroll,
    ShopListItem
  },
  computed: {
    // 映射辅助方法，可以是对象写法
    ...mapGetters(['shopInfo'])
  },
  methods: {},
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
#cart_list {
  font-size: 0.68rem;
  height: calc(100vh - 1.9rem - 2.09rem - 3.6rem);
}

/**
* scroll
*/
.cart_scroll {
  height: 100%;
  overflow: hidden;
}
</style>
