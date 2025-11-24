import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recommend from '../views/Recommend.vue'
import Guide from '../views/Guide.vue'
import Route from '../views/Route.vue'
import RouteDetail from '../views/RouteDetail.vue'
import RecommendDetail from '../views/RecommendDetail.vue'
import Qimen from '../views/Qimen.vue'
import Yixian from '../views/Yixian.vue'
import Huangshan from '../views/Huangshan.vue'
import Huizhou from '../views/Huizhou.vue'
import Xiuning from '../views/Xiuning.vue'
import Tunxi from '../views/Tunxi.vue'
import Shexian from '../views/Shexian.vue'

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
    path: '/guide',
    name: 'Guide',
    component: Guide
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
