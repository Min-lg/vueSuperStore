<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "TabBar",
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
#tab-bar {
  display: flex;
  position: fixed;
  /* align-items: center;
  justify-content: space-evenly; */
  /* box-sizing: border-box;
  padding: 10px; */
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f6f6f6;
  /*  box-shadow: h-shadow   v-shadow   blur  spread  color   inset;
    h-shadow     必需。水平阴影的位置。允许负值。
    v-shadow     必需。垂直阴影的位置。允许负值。
    blur              可选。模糊距离。
    spread         可选。阴影的尺寸。
    color            可选。阴影的颜色。
    inset            可选。将外部阴影(outset)改为内部阴影。 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.1);
  font-size: 12px;
  font-weight: 700;
}
</style>