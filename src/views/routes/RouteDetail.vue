<template>
  <div class="route-detail-page">
    <div v-if="loading" class="loading-state">加载中...</div>
    <div v-else-if="error" class="error-state">{{ error }}</div>
    <div
      v-else-if="routeDetail"
      class="detail-content"
      :style="{ backgroundImage: `url(${backgroundUrl})`, height: pageHeight + 'px' }"
    >
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRouteById } from '@/api/route'
import { transformSingleRouteData } from '@/utils/dataTransform'

const route = useRoute()
const router = useRouter()
const routeDetail = ref(null)
const loading = ref(true)
const error = ref(null)
const pageHeight = ref(0)

const defaultBgUrl = new URL('../../png/xianlu/xianluXQ/线路详情背景.png', import.meta.url).href

const backgroundUrl = computed(() => {
  return routeDetail.value?.detailImageUrl || defaultBgUrl
})

onMounted(async () => {
  try {
    loading.value = true
    const id = route.params.id
    const result = await getRouteById(id)
    if (result.status === 'success' && result.result?.data?.length > 0) {
      routeDetail.value = transformSingleRouteData(result.result.data[0])
    } else {
      error.value = '未找到线路数据'
    }
  } catch (err) {
    error.value = '数据加载失败，请稍后重试'
    console.error('线路详情 API 请求失败:', err)
  } finally {
    loading.value = false
    calculatePageHeight()
  }
})

function calculatePageHeight() {
  const bgUrl = backgroundUrl.value
  const img = new Image()
  img.onload = () => {
    const imgWidth = img.naturalWidth
    const imgHeight = img.naturalHeight
    const viewportWidth = window.innerWidth
    pageHeight.value = (viewportWidth / imgWidth) * imgHeight
  }
  img.src = bgUrl
}
</script>

<style scoped>
.route-detail-page {
  width: 100%;
  min-height: 100vh;
}

.loading-state,
.error-state {
  padding: 60px 20px;
  font-size: 18px;
  color: #675529;
  text-align: center;
}

.error-state {
  color: #dc2626;
}

.detail-content {
  width: 100%;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
</style>
