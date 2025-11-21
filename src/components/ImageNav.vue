<template>
  <div class="image-nav">
    <img 
      src="../png/nav/首页.png" 
      alt="首页" 
      class="nav-icon"
      @click="navigateTo('/home')"
    />
    <img 
      src="../png/nav/线路.png" 
      alt="线路" 
      class="nav-icon"
      @click="navigateTo('/route')"
    />
    <img 
      src="../png/nav/推荐.png" 
      alt="推荐" 
      class="nav-icon"
      @click="navigateTo('/recommend')"
    />
    <img 
      src="../png/nav/指南.png" 
      alt="指南" 
      class="nav-icon"
      @click="navigateTo('/guide')"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.image-nav {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 1000;
}

.nav-icon {
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.nav-icon:hover {
  transform: scale(1.1);
  opacity: 0.9;
}

.nav-icon:active {
  transform: scale(0.95);
}

@media (max-width: 768px) {
  .image-nav {
    right: 15px;
    bottom: 15px;
    gap: 10px;
  }
  
  .nav-icon {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 480px) {
  .image-nav {
    right: 10px;
    bottom: 10px;
    gap: 8px;
  }
  
  .nav-icon {
    width: 45px;
    height: 45px;
  }
}

@media (orientation: landscape) and (max-height: 500px) {
  .image-nav {
    gap: 6px;
  }
  
  .nav-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
