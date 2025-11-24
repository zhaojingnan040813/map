<template>
  <div class="route-detail-page" v-if="routeDetail">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <div class="header-info">
        <h1 class="route-title">{{ routeDetail.title }}</h1>
        <div class="route-meta">
          <span class="meta-item">{{ routeDetail.extra1 }}</span>
          <span class="meta-divider">|</span>
          <span class="meta-item price">{{ routeDetail.extra2 }}</span>
        </div>
      </div>
    </div>

    <div class="detail-container">
      <div class="day-item" v-for="detail in routeDetail.details" :key="detail.day">
        <div class="day-header">
          <div class="day-badge">DAY {{ detail.day }}</div>
        </div>

        <div class="day-content">
          <div class="day-title">
            <span class="title-icon">○</span>
            <h2>{{ detail.title }}</h2>
          </div>

          <div class="time-section" v-if="detail.morning">
            <div class="time-label">上午</div>
            <div class="time-content">{{ detail.morning }}</div>
          </div>

          <div class="time-section" v-if="detail.afternoon">
            <div class="time-label">下午</div>
            <div class="time-content">{{ detail.afternoon }}</div>
          </div>

          <div class="time-section" v-if="detail.evening">
            <div class="time-label">晚上</div>
            <div class="time-content">{{ detail.evening }}</div>
          </div>

          <div class="summary-section" v-if="detail.summary">
            <div class="summary-label">行程描述</div>
            <div class="summary-content">{{ detail.summary }}</div>
          </div>

          <div class="image-section" v-if="detail.imageUrl">
            <img :src="detail.imageUrl" :alt="`Day ${detail.day}`" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import routesData from '../../data/routes.json'

const route = useRoute()
const router = useRouter()
const routeDetail = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  routeDetail.value = routesData.routes.find(r => r.id === id)
})

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.route-detail-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f5f0e8 0%, #e8dcc8 100%);
  padding: 20px;
  box-sizing: border-box;
}

.detail-header {
  max-width: 900px;
  margin: 0 auto 30px;
  background: rgba(255, 255, 255, 0.95);
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.back-btn {
  padding: 8px 16px;
  background: #8b7355;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #6d5a42;
  transform: translateX(-2px);
}

.header-info {
  text-align: center;
}

.route-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 12px 0;
}

.route-meta {
  font-size: 16px;
  color: #666;
}

.meta-item {
  margin: 0 8px;
}

.meta-divider {
  color: #ccc;
}

.price {
  color: #e74c3c;
  font-weight: 600;
  font-size: 18px;
}

.detail-container {
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 40px;
}

.day-item {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  margin-bottom: 24px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}

.day-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.day-header {
  background: linear-gradient(135deg, #8b7355 0%, #6d5a42 100%);
  padding: 12px 24px;
}

.day-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
}

.day-content {
  padding: 24px;
}

.day-title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
}

.title-icon {
  font-size: 24px;
  color: #8b7355;
  margin-right: 12px;
}

.day-title h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.time-section {
  margin-bottom: 16px;
  padding: 12px 16px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #8b7355;
}

.time-label {
  font-size: 14px;
  font-weight: 600;
  color: #8b7355;
  margin-bottom: 6px;
}

.time-content {
  font-size: 15px;
  color: #555;
  line-height: 1.8;
}

.summary-section {
  margin: 20px 0;
  padding: 16px;
  background: linear-gradient(135deg, #fff9f0 0%, #fef5e7 100%);
  border-radius: 8px;
  border: 1px solid #f0e6d2;
}

.summary-label {
  font-size: 14px;
  font-weight: 600;
  color: #8b7355;
  margin-bottom: 8px;
}

.summary-content {
  font-size: 15px;
  color: #555;
  line-height: 1.8;
}

.image-section {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.image-section img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .route-detail-page {
    padding: 12px;
  }

  .detail-header {
    padding: 16px;
    margin-bottom: 20px;
  }

  .route-title {
    font-size: 22px;
  }

  .route-meta {
    font-size: 14px;
  }

  .price {
    font-size: 16px;
  }

  .day-item {
    margin-bottom: 16px;
  }

  .day-header {
    padding: 10px 16px;
  }

  .day-badge {
    padding: 6px 16px;
    font-size: 14px;
  }

  .day-content {
    padding: 16px;
  }

  .day-title h2 {
    font-size: 18px;
  }

  .time-section {
    padding: 10px 12px;
    margin-bottom: 12px;
  }

  .time-label,
  .summary-label {
    font-size: 13px;
  }

  .time-content,
  .summary-content {
    font-size: 14px;
  }
}
</style>
