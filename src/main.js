import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入注册组件
import Toast from "components/common/toast/index";
// 引入图片懒加载
import VueLazyLoad from "vue-lazyload"
// 引入fastClick
import FastClick from "fastclick"

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue() 
// 模板注册
Vue.use(Toast);
// 解决移动端300ms延迟
FastClick.attach(document.body)
// 使用懒加载插件,修改img的src属性为v-lazy
Vue.use(VueLazyLoad,{
  // 加载图片时要显示的src
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
