<template>
  <div class="route-page">
    <div class="route-header">
      <h1 class="page-title">精选线路</h1>
      <p class="page-subtitle">探索黄山，发现徽州之美</p>
    </div>

    <div class="route-container">
      <div class="route-grid">
        <RouteCard
          v-for="route in currentPageRoutes"
          :key="route.id"
          :imageUrl="route.imageUrl"
          :title="route.title"
          :description="route.description"
          :address="route.address"
          :contact="route.contact"
        />
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button 
          class="pagination-btn prev-btn"
          :disabled="currentPage === 1"
          @click="prevPage"
        >
          <span class="btn-icon">←</span>
          <span class="btn-text">上一页</span>
        </button>

        <div class="page-info">
          <span class="current-page">{{ currentPage }}</span>
          <span class="page-separator">/</span>
          <span class="total-pages">{{ totalPages }}</span>
        </div>

        <button 
          class="pagination-btn next-btn"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          <span class="btn-text">下一页</span>
          <span class="btn-icon">→</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import RouteCard from '../components/RouteCard.vue'
import routesData from '../data/routes.json'

const routes = ref(routesData.routes)
const currentPage = ref(1)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const itemsPerPage = computed(() => {
  return isMobile.value ? 5 : 4
})

const totalPages = computed(() => {
  return Math.ceil(routes.value.length / itemsPerPage.value)
})

const currentPageRoutes = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return routes.value.slice(start, end)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleResize = () => {
  const wasMobile = isMobile.value
  checkMobile()
  
  if (wasMobile !== isMobile.value) {
    currentPage.value = 1
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.route-page {
  width: 100%;
  min-height: 100vh;
  background-image: url('../png/xianlu/背景图.png');
  background-size: 100% 100%;
  background-position: top center;
  background-repeat: no-repeat;
  padding: 40px 20px 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.route-header {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeInDown 0.8s ease-out;
}

.page-title {
  font-size: 42px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 12px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.page-subtitle {
  font-size: 18px;
  color: #666;
  margin: 0;
}

.route-container {
  max-width: 1400px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.route-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
  animation: fadeInUp 0.8s ease-out;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  animation: fadeIn 1s ease-out;
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #fff;
  border: 2px solid #667eea;
  border-radius: 8px;
  color: #667eea;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.pagination-btn:hover:not(:disabled) {
  background: #667eea;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.pagination-btn:active:not(:disabled) {
  transform: translateY(0);
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  border-color: #ccc;
  color: #ccc;
}

.btn-icon {
  font-size: 18px;
  line-height: 1;
}

.btn-text {
  line-height: 1;
}

.page-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.current-page {
  color: #667eea;
  font-size: 24px;
}

.page-separator {
  color: #999;
}

.total-pages {
  color: #666;
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
    margin-bottom: 30px;
  }

  .pagination {
    gap: 12px;
    margin-top: 30px;
  }

  .pagination-btn {
    padding: 10px 16px;
    font-size: 14px;
  }

  .btn-text {
    display: none;
  }

  .btn-icon {
    font-size: 20px;
  }

  .page-info {
    padding: 8px 16px;
    font-size: 16px;
  }

  .current-page {
    font-size: 20px;
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
  }

  .pagination-btn {
    padding: 8px 12px;
  }

  .page-info {
    padding: 6px 12px;
    font-size: 14px;
  }

  .current-page {
    font-size: 18px;
  }
}
</style>
