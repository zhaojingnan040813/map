<template>
  <div class="home-container">
    <ImageViewer 
      :image-src="currentImage"
      image-alt="首页背景"
      :enable-inertia="true"
      :border-feedback="true"
      :class="{ 'image-loaded': isHighQualityLoaded }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ImageViewer from '../components/ImageViewer.vue'
import lowQualityImage from '../png/首页-模糊.png'
import highQualityImage from '../png/首页.png'

const currentImage = ref(lowQualityImage)
const isHighQualityLoaded = ref(false)

onMounted(() => {
  const img = new Image()
  img.src = highQualityImage
  
  img.onload = () => {
    currentImage.value = highQualityImage
    isHighQualityLoaded.value = true
  }
})
</script>

<style scoped>
.home-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.home-container :deep(.viewer-image) {
  transition: opacity 0.5s ease-in-out;
}
</style>
