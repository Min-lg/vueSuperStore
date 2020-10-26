<template>
  <div class="tab-control">
    <div class="tab-control-item"
     v-for="(item,index) in titles"
    :class="{active: index===currentIndex}"
     @click="activeSpan(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
   return {
     currentIndex: 0
   }
  },
   methods:{
     activeSpan(index) {
       this.currentIndex = index
     }
   }
}
</script>
<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 44px;
  line-height: 44px;
  font-weight: bold;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.tab-control-item span{
  padding: 3px;
}
.active{
  color: palevioletred;
}
.active span {
  border-bottom: 3px solid palevioletred;
}
</style>