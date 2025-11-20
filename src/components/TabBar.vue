<template>
  <div class="tab-bar">
    <div 
      v-for="item in tabs" 
      :key="item.path"
      class="tab-item"
      :class="{ active: currentPath === item.path }"
      @click="handleTabClick(item.path)"
    >
      <div class="tab-icon" v-html="item.icon"></div>
      <div class="tab-label">{{ item.label }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentPath = computed(() => route.path)

const tabs = [
  {
    path: '/home',
    label: '首页',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>`
  },
  {
    path: '/recommend',
    label: '推荐',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>`
  },
  {
    path: '/county',
    label: '县区',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>`
  },
  {
    path: '/guide',
    label: '指南',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>`
  },
  {
    path: '/route',
    label: '线路',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="18" y1="20" x2="18" y2="10"></line>
      <line x1="6" y1="20" x2="6" y2="4"></line>
      <line x1="12" y1="20" x2="12" y2="14"></line>
      <circle cx="18" cy="6" r="3"></circle>
      <circle cx="6" cy="20" r="3"></circle>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>`
  }
]

const handleTabClick = (path) => {
  router.push(path)
}
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #999;
  transition: color 0.3s;
}

.tab-item.active {
  color: #1989fa;
}

.tab-icon {
  width: 24px;
  height: 24px;
  margin-bottom: 4px;
}

.tab-icon svg {
  width: 100%;
  height: 100%;
}

.tab-label {
  font-size: 12px;
}
</style>
