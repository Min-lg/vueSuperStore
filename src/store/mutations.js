import {
  ADD_COUNT,
  ADD_NEW_SHOP
} from './mutations-type'

export default {
  // 已存在商品，数量+1
  [ADD_COUNT](state, payload) {
    payload.count += 1
  },
  // 不存在商品，count置0，添加新商品数据
  [ADD_NEW_SHOP](state, payload) {
    state.shopInfo.push(payload)
  }
}