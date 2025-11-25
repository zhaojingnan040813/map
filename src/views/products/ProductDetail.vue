<template>
  <div class="product-detail-page">
    <div v-if="product" class="detail-container">
      <div class="detail-header">
        <button class="back-button" @click="goBack">
          <img src="../../assets/back.svg" alt="返回" class="back-icon" />
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
            
            <div class="contact-divider"></div>
            
            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon">📍</span>
                <span class="contact-label">生产厂家</span>
                <span class="contact-text">{{ product.details.address }}</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">📞</span>
                <span class="contact-label">联系人</span>
                <span class="contact-text">{{ product.details.contact }}</span>
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
  background-size: cover;
  background-position: bottom center;
  background-repeat: no-repeat;
  padding: 20px;
  box-sizing: border-box;
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
  left: 0;
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
  background: transparent;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  border: none;
  position: relative;
}

.section-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 20px 0;
  text-align: left;
}

.description-text {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin: 0;
}

.contact-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 30px 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #555;
}

.contact-icon {
  font-size: 20px;
  margin-right: 10px;
  min-width: 28px;
}

.contact-label {
  font-weight: 600;
  color: #333;
  margin-right: 8px;
  min-width: 80px;
}

.contact-text {
  flex: 1;
  color: #555;
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
    padding: 25px 80px;
    min-width: 300px;
  }

  .section-title {
    font-size: 22px;
  }

  .description-text {
    font-size: 15px;
  }

  .contact-label {
    min-width: 70px;
  }
}

@media (max-width: 480px) {
  .product-detail-page {
    padding: 10px;
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

  .section-title {
    font-size: 20px;
  }

  .description-text {
    font-size: 14px;
  }

  .contact-item {
    font-size: 14px;
  }

  .contact-label {
    min-width: 60px;
    font-size: 14px;
  }
}
</style>
