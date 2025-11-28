<template>
  <div class="route-page">
    <div class="route-container">
      <h1 class="page-title">安徽省黄山市职工疗休养基地</h1>

      <div v-if="loading" class="loading-state">加载中...</div>
      <div v-else-if="error" class="error-state">{{ error }}</div>
      <template v-else>
        <div class="route-grid">
          <RouteCard
            v-for="route in routes"
            :key="route.id"
            :id="route.id"
            :imageUrl="route.imageUrl"
            :title="route.title"
            :description="route.description"
            :address="route.address"
            :contact="route.contact"
            detailRouteName="RouteDetail"
          />
        </div>

        <Pagination
          v-model:currentPage="currentPage"
          :totalPages="totalPages"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import RouteCard from '../../components/RouteCard.vue'
import Pagination from '../../components/Pagination.vue'
import { getRouteList } from '@/api/route'
import { transformRouteData } from '@/utils/dataTransform'

const routes = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const total = ref(0)
const pageSize = 4

const totalPages = computed(() => {
  return Math.ceil(total.value / pageSize)
})

async function fetchData(page = 1) {
  try {
    loading.value = true
    error.value = null
    const result = await getRouteList({ page, pagesize: pageSize })
    if (result.status === 'success') {
      routes.value = transformRouteData(result.result?.data || [])
      total.value = result.result?.total || 0
    }
  } catch (err) {
    error.value = '数据加载失败，请稍后重试'
    console.error('线路管理 API 请求失败:', err)
  } finally {
    loading.value = false
  }
}

watch(currentPage, (newPage) => {
  fetchData(newPage)
})

onMounted(() => {
  fetchData(1)
})
</script>

<style scoped>
.route-page {
  width: 100%;
  min-height: 100vh;
  background-image: url('../../png/xianlu/背景图.png');
  background-size: cover;
  background-position: bottom center;
  background-repeat: no-repeat;
  padding: 0px 20px 80px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.route-header {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeInDown 0.8s ease-out;
}

.page-title {
  font-size: 36px;
  font-weight: bold;
  color: #675529;
  text-align: center;
  margin-bottom: 0px;
  background-image: url('../../png/chanpin/标题边框.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  padding: 30px 100px;
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  min-width: 400px;
}

.page-subtitle {
  font-size: 18px;
  color: #666;
  margin: 0;
}

.route-container {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
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

.route-grid {
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-bottom: 40px;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 1200px) {
  .route-grid {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .route-page {
    padding: 20px 16px 60px;
    background-attachment: scroll;
  }

  .route-header {
    margin-bottom: 24px;
  }

  .page-title {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .route-grid {
    gap: 16px;
    padding-bottom: 30px;
  }
}

@media (max-width: 480px) {
  .route-page {
    padding: 16px 12px 50px;
  }

  .page-title {
    font-size: 28px;
  }

  .page-subtitle {
    font-size: 14px;
  }

  .route-grid {
    gap: 12px;
    padding-bottom: 20px;
  }
}
</style>
