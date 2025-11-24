<template>
  <div class="recommend-page">
    <div class="recommend-container">
      <h1 class="page-title">安徽省黄山市职工疗休养基地</h1>
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
