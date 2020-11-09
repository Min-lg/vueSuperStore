export default {
  // 获取当前购物车商品数量
  shopLength(state) {
    return state.shopInfo.length
  },
  // 获取当前商品
  shopInfo(state) {
    return state.shopInfo
  }
}