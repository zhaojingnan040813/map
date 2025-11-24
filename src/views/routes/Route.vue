<template>
  <div class="route-page">
    <!-- <div class="route-header">
      <h1 class="page-title">精选线路</h1>
      <p class="page-subtitle">探索黄山，发现徽州之美</p>
    </div> -->

    <div class="route-container">
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
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RouteCard from '../../components/RouteCard.vue'
import routesData from '../../data/routes.json'

const routes = ref(routesData.routes)
</script>

<style scoped>
.route-page {
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
