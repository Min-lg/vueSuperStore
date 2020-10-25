<template>
  <div class="tab-bar-item" @click="barClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-select"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>

    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-select" src="../../assets/img/tabbar/selectclassify.svg" alt="">
      <div>首页</div> -->
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      //  isActive: true
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1 
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    barClick() {
      //  console.log(this.path);
      this.$router.replace(this.path);
    },
  },
};
</script>
<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin: 3px 0 2px 0;
}
</style>