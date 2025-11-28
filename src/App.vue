<script setup>
import { onMounted } from 'vue'
import ImageNav from './components/ImageNav.vue'
import { getToken } from './api/auth'

onMounted(async () => {
  try {
    await getToken()
    console.log('Token 获取成功')
  } catch (error) {
    console.error('Token 获取失败:', error)
  }
})
</script>

<template>
  <div class="app-wrapper">
    <router-view></router-view>
    <ImageNav />
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #dfdcb8;
  overflow-y: auto;
}
</style>
