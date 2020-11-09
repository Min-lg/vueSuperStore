import {
  ADD_COUNT,
  ADD_NEW_SHOP
} from './mutations-type'

export default {
  // 计算购物车属性属性
  addCart(content, payload) {
    return new Promise((resolve, reject)=>{
      //查找是否已存在商品
      let oldProduct = content.state.shopInfo.find(item => item.iid == payload.iid)

      // 判断返回值
      if (oldProduct) {
        // 已存在该商品数量+1
        // oldProduct.count += 1
        content.commit(ADD_COUNT, oldProduct)
        resolve('商品数量+1')
      } else {
        // 不存在商品，添加至数据中
        payload.count = 1 //商品初始数量
        payload.checked = true //商品是否选中，默认为true
        content.commit(ADD_NEW_SHOP, payload)
        resolve('已加入购物车')
      }
    })
  }
}