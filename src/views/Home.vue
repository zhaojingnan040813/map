<template>
  <div class="home-container">
    <ImageViewer 
      :image-src="homeImage"
      image-alt="首页背景"
      :enable-inertia="true"
      :border-feedback="true"
    />
  </div>
</template>

<script setup>
import ImageViewer from '../components/ImageViewer.vue'
import homeImage from '../png/首页.png'
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
