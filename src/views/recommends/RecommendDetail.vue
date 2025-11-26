<template>
  <div class="recommend-detail-page" v-if="recommendDetail">
    <div class="detail-header">
      <button class="back-button" @click="goBack">
        <img src="../../assets/back.svg" alt="返回" class="back-icon" />
      </button>
      <h1 class="product-title">{{ recommendDetail.details.title }}</h1>
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
            <div class="info-value">{{ recommendDetail.details.contactName }}：{{ recommendDetail.details.contactPhone }}</div>
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
import recommendationsData from '../../data/recommendations.json'

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
  background-image: url('../../png/tuijian/tuijianXQ/背景图.png');
  background-size: cover;
  background-position: bottom center;
  background-repeat: no-repeat;
  padding: 20px;
  box-sizing: border-box;
}

.detail-header {
  margin-bottom: 30px;
  position: relative;
  text-align: center;
}

.back-button {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 130px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.back-button:hover {
  transform: translateY(-50%) translateX(-5px);
}

.back-icon {
  width: 48px;
  height: 48px;
  display: block;
}

.product-title {
  font-size: 36px;
  font-weight: bold;
  color: #675529;
  text-align: center;
  margin: 0;
  background-image: url('../../png/chanpin/标题边框.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  padding: 30px 100px;
  display: inline-block;
  min-width: 400px;
}

.detail-content {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  gap: 30px;
  padding-bottom: 50px;
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
  min-height: 450px;
  object-fit: cover;
}

.info-card {
  background: transparent;
  padding: 32px;
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
  color: #4a3f2f;
  font-weight: 600;
  color: #8b7355;
  margin-bottom: 8px;
}

.info-icon {
  font-size: 18px;
  margin-right: 8px;
}

.info-value {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  padding-left: 26px;
}

.introduction-card {
  background: transparent;
   padding: 0 36px 36px 36px;
  height: 100%;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  color: #88712b;
  margin: 0 0 20px 0;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  text-align: center;
}

.introduction-content {
  font-size: 17px;
  color: #2c2c2c;
  line-height: 1.9;
}

.introduction-content p {
  margin: 0 0 20px 0;
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

  .back-button {
    left: 30px;
  }

  .product-title {
    font-size: 32px;
    padding: 25px 80px;
    min-width: 300px;
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

@media (max-width: 480px) {
  .back-button {
    left: 7px;
  }

  .product-title {
    font-size: 24px;
    padding: 20px 50px;
    min-width: 250px;
  }

  .back-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
