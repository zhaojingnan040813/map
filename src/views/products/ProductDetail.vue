<template>
  <div class="product-detail-page">
    <div v-if="product" class="detail-container">
      <div class="detail-header">
        <button class="back-button" @click="goBack">
          ← 返回
        </button>
        <h1 class="product-title">{{ product.name }}</h1>
      </div>

      <div class="detail-content">
        <div class="image-section">
          <div class="main-image">
            <img :src="product.image" :alt="product.name" />
          </div>
        </div>

        <div class="info-section">
          <div class="info-card">
            <h2 class="section-title">产品介绍</h2>
            <p class="description-text">{{ product.details.description }}</p>
          </div>

          <div class="info-card contact-card">
            <h2 class="section-title">联系方式</h2>
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span class="contact-text">{{ product.details.contact }}</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span class="contact-text">{{ product.details.address }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading-container">
      <p>产品信息加载中...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productsData from '../../data/products.json'

const route = useRoute()
const router = useRouter()
const product = ref(null)

onMounted(() => {
  const productId = parseInt(route.params.id)
  product.value = productsData.products.find(p => p.id === productId)
  
  if (!product.value) {
    router.push('/product')
  }
})

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.product-detail-page {
  width: 100%;
  min-height: 100vh;
  background-image: url('../../png/chanpin/产品背景.png');
  background-size: 100% 100%;
  background-position: top center;
  background-repeat: no-repeat;
  padding: 20px;
  box-sizing: border-box;
}

.product-detail-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.detail-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 80px;
}

.detail-header {
  margin-bottom: 30px;
}

.back-button {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
  background: #fff;
  transform: translateX(-5px);
}

.product-title {
  font-size: 42px;
  font-weight: bold;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 30px;
  align-items: start;
}

.image-section {
  position: sticky;
  top: 20px;
}

.main-image {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  background: #fff;
}

.main-image img {
  width: 100%;
  height: auto;
  display: block;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
}

.description-text {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin: 0;
}

.contact-card {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border: 2px solid rgba(102, 126, 234, 0.3);
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #555;
}

.contact-icon {
  font-size: 24px;
  margin-right: 12px;
}

.contact-text {
  flex: 1;
}

.loading-container {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  color: #fff;
  font-size: 20px;
}

@media (max-width: 1024px) {
  .detail-content {
    grid-template-columns: 1fr;
  }

  .image-section {
    position: static;
  }
}

@media (max-width: 768px) {
  .product-detail-page {
    padding: 15px;
  }

  .product-title {
    font-size: 32px;
  }

  .info-card {
    padding: 20px;
  }

  .section-title {
    font-size: 20px;
  }

}

@media (max-width: 480px) {
  .product-detail-page {
    padding: 10px;
  }

  .product-title {
    font-size: 28px;
  }

  .back-button {
    padding: 8px 16px;
    font-size: 14px;
  }

  .info-card {
    padding: 15px;
  }

  .section-title {
    font-size: 18px;
  }
}
</style>
