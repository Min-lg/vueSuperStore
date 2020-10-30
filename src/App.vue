<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar.vue";

export default {
  name: "app",
  components: {
    MainTabBar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
@import url("assets/css/base.css");
</style>