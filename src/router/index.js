import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Recommend from '../views/Recommend.vue'
import Guide from '../views/Guide.vue'
import Route from '../views/Route.vue'
import RouteDetail from '../views/RouteDetail.vue'
import RecommendDetail from '../views/RecommendDetail.vue'
import CoordinatePickerPage from '../views/CoordinatePickerPage.vue'

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
    path: '/picker',
    name: 'CoordinatePicker',
    component: CoordinatePickerPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
