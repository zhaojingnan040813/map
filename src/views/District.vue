<template>
  <div class="page-container">
    <div class="placeholder">
      <h2>区县页面占位</h2>
      <p>您已进入：{{ displayName }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { countyMap } from '../data/counties'

const route = useRoute()

/**
 * 将路由参数映射为中文区县名
 */
const mapDistrictToLabel = (key) => {
  const dict = {
    tunxi: '屯溪区',
    huangshan: '黄山区',
    huizhou: '徽州区',
    shexian: '歙县',
    xiuning: '休宁县',
    yixian: '黟县',
    qimen: '祁门县'
  }
  return dict[key] || '未知区县'
}

/**
 * 计算展示的中文名称
 */
const displayName = computed(() => countyMap[route.params.district] || '未知区县')
</script>

<style scoped>
.page-container {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.placeholder {
  text-align: center;
  color: #666;
}

.placeholder h2 {
  font-size: 24px;
  margin-bottom: 12px;
}

.placeholder p {
  font-size: 16px;
}
</style>