<template>
  <div class="recommend-detail-page" v-if="recommendDetail">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h1 class="detail-title">{{ recommendDetail.details.title }}</h1>
    </div>

    <div class="detail-content">
      <div class="left-section">
        <div class="image-container">
          <img :src="recommendDetail.details.imageUrl" :alt="recommendDetail.details.title" />
        </div>
        
        <div class="info-card">
          <div class="info-item">
            <div class="info-label">
              <span class="info-icon">📍</span>
              <span>详细地址</span>
            </div>
            <div class="info-value">{{ recommendDetail.details.address }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">
              <span class="info-icon">👤</span>
              <span>联系人</span>
            </div>
            <div class="info-value">{{ recommendDetail.details.contactName }}</div>
          </div>
          
          <div class="info-item">
            <div class="info-label">
              <span class="info-icon">📞</span>
              <span>联系电话</span>
            </div>
            <div class="info-value">{{ recommendDetail.details.contactPhone }}</div>
          </div>
        </div>
      </div>

      <div class="right-section">
        <div class="introduction-card">
          <h2 class="section-title">基地介绍</h2>
          <div class="introduction-content">
            <p v-for="(paragraph, index) in formattedIntroduction" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import recommendationsData from '../data/recommendations.json'

const route = useRoute()
const router = useRouter()
const recommendDetail = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  recommendDetail.value = recommendationsData.recommendations.find(r => r.id === id)
})

const formattedIntroduction = computed(() => {
  if (!recommendDetail.value?.details.introduction) return []
  return recommendDetail.value.details.introduction.split('\n\n').filter(p => p.trim())
})

const goBack = () => {
  router.push({ name: 'Recommend' })
}
</script>

<style scoped>
.recommend-detail-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #f5f0e8 0%, #e8dcc8 100%);
  padding: 20px;
  box-sizing: border-box;
}

.detail-header {
  max-width: 1200px;
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

.detail-title {
  font-size: 28px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  text-align: center;
}

.detail-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  padding-bottom: 40px;
}

.left-section {
  flex: 0 0 45%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.right-section {
  flex: 1;
}

.image-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  min-height: 300px;
  object-fit: cover;
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.info-item {
  margin-bottom: 20px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #8b7355;
  margin-bottom: 8px;
}

.info-icon {
  font-size: 18px;
  margin-right: 8px;
}

.info-value {
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  padding-left: 26px;
}

.introduction-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
}

.introduction-content {
  font-size: 15px;
  color: #555;
  line-height: 1.8;
}

.introduction-content p {
  margin: 0 0 16px 0;
  text-indent: 2em;
}

.introduction-content p:last-child {
  margin-bottom: 0;
}

@media (max-width: 968px) {
  .detail-content {
    flex-direction: column;
  }

  .left-section {
    flex: 1;
  }
}

@media (max-width: 768px) {
  .recommend-detail-page {
    padding: 12px;
  }

  .detail-header {
    padding: 16px;
    margin-bottom: 20px;
  }

  .detail-title {
    font-size: 22px;
  }

  .detail-content {
    gap: 16px;
  }

  .info-card,
  .introduction-card {
    padding: 20px;
  }

  .section-title {
    font-size: 18px;
  }

  .introduction-content {
    font-size: 14px;
  }

  .info-label {
    font-size: 13px;
  }

  .info-value {
    font-size: 14px;
  }
}
</style>
