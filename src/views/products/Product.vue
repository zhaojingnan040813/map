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
            <div class="product-price">{{ product.price }}</div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button 
          class="pagination-btn"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
        >
          上一页
        </button>
        
        <div class="pagination-pages">
          <button
            v-for="page in visiblePages"
            :key="page"
            class="pagination-page"
            :class="{ active: page === currentPage }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>

        <button 
          class="pagination-btn"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
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

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

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
  padding: 40px 20px 80px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

.product-container {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
}

.page-title {
  font-size: 36px;
  font-weight: bold;
  color: #675529;
  text-align: center;
  margin-bottom: 40px;
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

.product-price {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
  margin-top: auto;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 20px 0;
}

.pagination-btn {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pagination-btn:hover:not(:disabled) {
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-pages {
  display: flex;
  gap: 8px;
}

.pagination-page {
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pagination-page:hover {
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.pagination-page.active {
  background: linear-gradient(135deg, #675529 0%, #4a3d1f 100%);
  color: #fff;
  font-weight: bold;
}

.pagination-page:disabled {
  cursor: default;
  background: rgba(255, 255, 255, 0.9);
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

  .product-price {
    font-size: 18px;
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
