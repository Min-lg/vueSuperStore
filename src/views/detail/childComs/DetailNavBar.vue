<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="toBack">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" :class="{active: index==currentIndex}" @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    };
  },
  methods: {
    // 当前title点击
    titleClick(index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    },
    // 返回上级
    toBack() {
      this.$router.back()
    }
  },
};
</script>
<style scoped>
.title{
  display: flex;
  font-size: 14px;
}
.title-item{
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.back img{
  margin-top: 10px;
}
</style>