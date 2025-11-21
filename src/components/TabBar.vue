<template>
  <div class="tab-bar">
    <div 
      v-for="item in tabs" 
      :key="item.path"
      class="tab-item"
      :class="{ active: currentPath === item.path }"
      @click="handleTabClick(item.path)"
      :ref="item.path === '/county' ? 'countyTabEl' : null"
    >
      <div class="tab-icon" v-html="item.icon"></div>
      <div class="tab-label">{{ item.label }}</div>
    </div>

    <div v-if="isCountyPopoverOpen" class="popover-overlay" @click="closeCountyPopover"></div>
    <div 
      v-if="isCountyPopoverOpen" 
      class="county-popover"
    >
      <ul class="county-list">
        <li 
          v-for="opt in countyOptions" 
          :key="opt.key" 
          class="county-item" 
          :class="{ selected: selectedDistrictKey === opt.key }"
          @click="handleCountySelect(opt)"
        >
          {{ opt.label }}
        </li>
      </ul>
      <div class="popover-arrow"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
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

const isCountyPopoverOpen = ref(false)
/**
 * 打开县区气泡（固定定位至页面顶部中央）
 */
const openCountyPopover = () => {
  isCountyPopoverOpen.value = true
}

/**
 * 关闭县区气泡
 */
const closeCountyPopover = () => {
  isCountyPopoverOpen.value = false
}

/**
 * Tab 点击处理：
 * - 非“县区”标签：按原逻辑跳转
 * - “县区”标签：切换气泡显示
 */
const handleTabClick = (path) => {
  if (path === '/county') {
    if (isCountyPopoverOpen.value) {
      closeCountyPopover()
    } else {
      openCountyPopover()
    }
  } else {
    router.push(path)
  }
}

const countyOptions = [
  { key: 'tunxi', label: '屯溪区' },
  { key: 'xiuning', label: '休宁县' },
  { key: 'huangshan', label: '黄山区' },
  { key: 'shexian', label: '歙县' },
  { key: 'huizhou', label: '徽州区' },
  { key: 'yixian', label: '黟县' },
  { key: 'qimen', label: '祁门县' }
]

/**
 * 当前选中的区县（来自路由参数）用于高亮
 */
const selectedDistrictKey = computed(() => {
  const d = route.params?.district
  return typeof d === 'string' ? d : null
})

/**
 * 选择县区并进行路由跳转
 */
const handleCountySelect = (opt) => {
  router.push(`/county/${opt.key}`)
  closeCountyPopover()
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

.popover-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 1000;
}

.county-popover {
  position: fixed;
  top: 575px;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 12px 12px 16px;
  width: min(92vw, 360px);
  z-index: 1001;
}

.county-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
  max-height: 260px;
  overflow-y: auto;
}

.county-item {
  background: #f7f8fa;
  border-radius: 8px;
  padding: 8px 10px;
  text-align: center;
  font-size: 14px;
  color: #333;
}

.county-item:active {
  background: #e6f2ff;
  color: #1989fa;
}

.county-item.selected {
  background: #e6f2ff;
  color: #1989fa;
  font-weight: 600;
}

.popover-arrow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #fff;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.05));
}
</style>
