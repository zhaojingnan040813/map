<template>
  <div class="product-page">
    <div class="product-container">
      <h1 class="page-title">新安康养产品</h1>
      <div class="product-grid">
        <div 
          v-for="product in currentPageProducts"
          :key="product.id"
          class="product-card"
          @click="handleProductClick(product)"
        >
          <div class="product-image-wrapper">
            <img :src="product.image" :alt="product.name" class="product-image" />
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-desc">{{ product.shortDescription }}</p>
            <div class="product-detail-text">了解详情></div>
          </div>
        </div>
      </div>

      <Pagination
        v-model:currentPage="currentPage"
        :totalPages="totalPages"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Pagination from '../../components/Pagination.vue'
import productsData from '../../data/products.json'

const router = useRouter()
const currentPage = ref(1)
const pageSize = 8

const allProducts = ref(productsData.products)

const totalPages = computed(() => {
  return Math.ceil(allProducts.value.length / pageSize)
})

const currentPageProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return allProducts.value.slice(start, end)
})

const handleProductClick = (product) => {
  router.push(`/product/${product.id}`)
}
</script>

<style scoped>
.product-page {
  width: 100%;
  height: 100vh;
  background-image: url('../../png/chanpin/产品背景.png');
  background-size: cover;
  background-position: bottom center;
  background-repeat: no-repeat;
  padding: 0px 20px 80px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.product-container {
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

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 15px;
}

.product-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
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
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.product-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  flex: 1;
  margin-bottom: 12px;
}

.product-detail-text {
  font-size: 16px;
  color: #86742b;
  margin-top: auto;
  text-align: left;
}

@media (max-width: 1400px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .page-title {
    font-size: 32px;
  }
}

@media (max-width: 768px) {
  .product-page {
    padding: 30px 15px 60px;
  }

  .page-title {
    font-size: 28px;
    margin-bottom: 30px;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .product-image-wrapper {
    height: 150px;
  }

  .product-info {
    padding: 15px;
  }

  .product-name {
    font-size: 16px;
  }

  .product-desc {
    font-size: 13px;
  }

  .product-detail-text {
    font-size: 15px;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 8px;
  }

  .pagination-btn {
    padding: 8px 16px;
    font-size: 13px;
  }

  .pagination-page {
    min-width: 36px;
    height: 36px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .product-page {
    padding: 20px 10px 50px;
  }

  .page-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .product-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .product-image-wrapper {
    height: 180px;
  }
}
</style>
