import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'


const Home = () => import('views/home/Home')
const Classify = () => import('views/classify/Classify')
const Shop = () => import('views/shop/Shop')
const My = () => import('views/my/My')
const Detail = () => import('views/detail/Detail')

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/',
    component: Home,
  },

  {
    path: '/home',
    component: Home
  },
  {
    path: '/classify',
    component: Classify
  },
  {
    path: '/shop',
    component: Shop
  },
  {
    path: '/my',
    component: My
  },
  {
    path: '/detail/:id',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
