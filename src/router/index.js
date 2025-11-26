import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recommend from '../views/recommends/Recommend.vue'
import Product from '../views/products/Product.vue'
import ProductDetail from '../views/products/ProductDetail.vue'
import Route from '../views/routes/Route.vue'
import RouteDetail from '../views/routes/RouteDetail.vue'
import RecommendDetail from '../views/recommends/RecommendDetail.vue'
import Qimen from '../views/locations/Qimen.vue'
import Yixian from '../views/locations/Yixian.vue'
import Huangshan from '../views/locations/Huangshan.vue'
import Huizhou from '../views/locations/Huizhou.vue'
import Xiuning from '../views/locations/Xiuning.vue'
import Tunxi from '../views/locations/Tunxi.vue'
import Shexian from '../views/locations/Shexian.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/route',
    name: 'Route',
    component: Route
  },
  {
    path: '/route/:id',
    name: 'RouteDetail',
    component: RouteDetail
  },
  {
    path: '/recommend/:id',
    name: 'RecommendDetail',
    component: RecommendDetail
  },
  {
    path: '/qimen',
    name: 'Qimen',
    component: Qimen
  },
  {
    path: '/yixian',
    name: 'Yixian',
    component: Yixian
  },
  {
    path: '/huangshan',
    name: 'Huangshan',
    component: Huangshan
  },
  {
    path: '/huangshan/tangjiazhuang',
    name: 'Tangjiazhuang',
    component: () => import('../views/locations/huangshan/Tangjiazhuang.vue')
  },
  {
    path: '/huangshan/taipinghu',
    name: 'Taipinghu',
    component: () => import('../views/locations/huangshan/Taipinghu.vue')
  },
  {
    path: '/huangshan/xianyuanju',
    name: 'Xianyuanju',
    component: () => import('../views/locations/huangshan/Xianyuanju.vue')
  },
  {
    path: '/huangshan/huzhu',
    name: 'Huzhu',
    component: () => import('../views/locations/huangshan/Huzhu.vue')
  },
  {
    path: '/huangshan/yanwoli',
    name: 'Yanwoli',
    component: () => import('../views/locations/huangshan/Yanwoli.vue')
  },
  {
    path: '/huangshan/xingfushijia',
    name: 'Xingfushijia',
    component: () => import('../views/locations/huangshan/Xingfushijia.vue')
  },
  {
    path: '/huangshan/chalinchang',
    name: 'Chalinchang',
    component: () => import('../views/locations/huangshan/Chalinchang.vue')
  },
  {
    path: '/huizhou',
    name: 'Huizhou',
    component: Huizhou
  },
  {
    path: '/xiuning',
    name: 'Xiuning',
    component: Xiuning
  },
  {
    path: '/tunxi',
    name: 'Tunxi',
    component: Tunxi
  },
  {
    path: '/shexian',
    name: 'Shexian',
    component: Shexian
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
