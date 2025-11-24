<template>
  <div class="product-page">
    <div class="product-container">
      <h1 class="page-title">黄山特色产品</h1>
      <div class="product-grid">
        <div 
          v-for="product in products"
          :key="product.id"
          class="product-card"
          @click="handleProductClick(product)"
        >
          <div class="product-image-wrapper">
            <img :src="product.image" :alt="product.name" class="product-image" />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-desc">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import backgroundImage from '../../png/chanpin/产品背景.png'
import huangshanLiwu from '../../png/chanpin/黄山礼物.png'
import xinankangyuan from '../../png/chanpin/新安康源.png'
import yihucha from '../../png/chanpin/壹葫茶.png'

const products = ref([
  {
    id: 1,
    name: '黄山礼物',
    description: '黄山特色伴手礼，传承徽州文化',
    image: huangshanLiwu
  },
  {
    id: 2,
    name: '新安康源',
    description: '新安江流域生态健康产品',
    image: xinankangyuan
  },
  {
    id: 3,
    name: '壹葫茶',
    description: '徽州传统名茶，品质上乘',
    image: yihucha
  }
])

const handleProductClick = (product) => {
  console.log('点击产品:', product.name)
}
</script>

<style scoped>
.product-page {
  width: 100%;
  height: 100%;
  background-image: v-bind('`url(${backgroundImage})`');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow-y: auto;
  position: relative;
}

.product-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.product-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100%;
}

.page-title {
  font-size: 36px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.product-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.product-image-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-info {
  padding: 20px;
}

.product-name {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.product-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .product-container {
    padding: 30px 15px;
  }

  .page-title {
    font-size: 28px;
    margin-bottom: 30px;
  }

  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  .product-image-wrapper {
    height: 180px;
  }

  .product-info {
    padding: 15px;
  }

  .product-name {
    font-size: 18px;
  }

  .product-desc {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .product-container {
    padding: 20px 10px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .product-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .product-image-wrapper {
    height: 160px;
  }
}
</style>
