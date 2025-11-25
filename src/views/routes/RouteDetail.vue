<template>
  <div class="route-detail-page" v-if="routeDetail" :style="{ height: pageHeight + 'px' }">
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import routesData from '../../data/routes.json'

const route = useRoute()
const router = useRouter()
const routeDetail = ref(null)
const pageHeight = ref(0)

onMounted(() => {
  const id = parseInt(route.params.id)
  routeDetail.value = routesData.routes.find(r => r.id === id)
  
  const img = new Image()
  img.onload = () => {
    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight
    const viewportWidth = window.innerWidth
    pageHeight.value = (viewportWidth / imgWidth) * imgHeight
  }
  img.src = new URL('../../png/xianlu/xianluXQ/线路详情背景.png', import.meta.url).href
})
</script>

<style scoped>
.route-detail-page {
  width: 100%;
  background-image: url('../../png/xianlu/xianluXQ/线路详情背景.png');
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
