<template>
  <div class="recommend-page">
    <div class="recommend-container">
      <div class="recommend-grid">
        <RouteCard
          v-for="recommendation in recommendations"
          :key="recommendation.id"
          :id="recommendation.id"
          :imageUrl="recommendation.imageUrl"
          :title="recommendation.title"
          :description="recommendation.description"
          :address="recommendation.address"
          :contact="recommendation.contact"
          @click="goToDetail(recommendation.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import RouteCard from '../../components/RouteCard.vue'
import recommendationsData from '../../data/recommendations.json'

const router = useRouter()
const recommendations = ref(recommendationsData.recommendations)

const goToDetail = (id) => {
  router.push({ name: 'RecommendDetail', params: { id } })
}
</script>

<style scoped>
.recommend-page {
  width: 100%;
  min-height: 100vh;
  background-image: url('../../png/xianlu/背景图.png');
  background-size: 100% 100%;
  background-position: top center;
  background-repeat: no-repeat;
  padding: 40px 20px 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.recommend-container {
  max-width: 1400px;
  margin: 0 auto;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.recommend-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
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

  .recommend-grid {
    gap: 16px;
    padding-bottom: 30px;
  }
}

@media (max-width: 480px) {
  .recommend-page {
    padding: 16px 12px 50px;
  }

  .recommend-grid {
    gap: 12px;
    padding-bottom: 20px;
  }
}
</style>
