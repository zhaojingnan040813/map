<template>
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
        :disabled="page === '...'"
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
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:currentPage', 'pageChange'])

const visiblePages = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage
  
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
  if (typeof page === 'number' && page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
    emit('pageChange', page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
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

.pagination-page:hover:not(:disabled):not(.active) {
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

@media (max-width: 768px) {
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
</style>
