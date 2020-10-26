<template>
  <div class="recommend">
    <div class="recommend-item" v-for="(item,index) in recommend" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "RecommendView",
  props: {
    recommend:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
   return {}
  },
   methods:{}
}
</script>
<style scoped>
.recommend{
  display: flex;
  width: 100%;

  text-align: center;
  font-size: 14px;
  padding: 15px 0 30px;
  border-bottom: 8px solid #dcdcdc;
}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>