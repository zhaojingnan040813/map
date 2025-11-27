<template>
  <div class="recommend-page">
    <div class="recommend-container">
      <h1 class="page-title">安徽省黄山市职工疗休养基地</h1>

      <div v-if="loading" class="loading-state">加载中...</div>
      <div v-else-if="error" class="error-state">{{ error }}</div>
      <template v-else>
        <div class="recommend-grid">
          <RouteCard
            v-for="recommendation in currentPageRecommendations"
            :key="recommendation.id"
            :id="recommendation.id"
            :imageUrl="recommendation.imageUrl"
            :title="recommendation.title"
            :description="recommendation.description"
            :address="recommendation.address"
            :contact="recommendation.contact"
            detailRouteName="RecommendDetail"
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
import { ref, computed, onMounted } from 'vue'
import RouteCard from '../../components/RouteCard.vue'
import Pagination from '../../components/Pagination.vue'
import { getRecommendList } from '@/api/recommend'
import { transformRecommendData } from '@/utils/dataTransform'

const recommendations = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const pageSize = 4

const totalPages = computed(() => {
  return Math.ceil(recommendations.value.length / pageSize)
})

const currentPageRecommendations = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return recommendations.value.slice(start, end)
})

onMounted(async () => {
  try {
    loading.value = true
    const result = await getRecommendList({ page: 1, pagesize: 100 })
    if (result.status === 'success' && result.result?.data) {
      recommendations.value = transformRecommendData(result.result.data)
    }
  } catch (err) {
    error.value = '数据加载失败，请稍后重试'
    console.error('推荐管理 API 请求失败:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.recommend-page {
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

.recommend-container {
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

.recommend-grid {
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding-bottom: 40px;
  animation: fadeInUp 0.8s ease-out;
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

@media (max-width: 1200px) {
  .recommend-grid {
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .recommend-page {
    padding: 20px 16px 60px;
    background-attachment: scroll;
  }

  .page-title {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .recommend-grid {
    gap: 16px;
    padding-bottom: 30px;
  }
}

@media (max-width: 480px) {
  .recommend-page {
    padding: 16px 12px 50px;
  }

  .page-title {
    font-size: 28px;
  }

  .recommend-grid {
    gap: 12px;
    padding-bottom: 20px;
  }
}
</style>
