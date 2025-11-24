<template>
  <div class="home-container">
    <ImageViewer 
      :image-src="currentImage"
      image-alt="首页背景"
      :enable-inertia="true"
      :border-feedback="true"
      :class="{ 'image-loaded': isHighQualityLoaded }"
    />
    
    <div class="hotspot-layer">
      <div 
        v-for="hotspot in hotspots"
        :key="hotspot.id"
        class="hotspot-area"
        :style="{
          left: hotspot.left,
          top: hotspot.top,
          width: hotspot.width,
          height: hotspot.height
        }"
        @click="handleHotspotClick(hotspot.route)"
      >
        <span v-if="debugMode" class="hotspot-label">
          {{ hotspot.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ImageViewer from '../components/ImageViewer.vue'
import lowQualityImage from '../png/首页-模糊.png'
import highQualityImage from '../png/首页.png'
import hotspotsData from '../data/hotspots.json'

const router = useRouter()
const currentImage = ref(lowQualityImage)
const isHighQualityLoaded = ref(false)
const hotspots = ref(hotspotsData.homeHotspots)
const debugMode = ref(false)

const handleHotspotClick = (route) => {
  router.push(route)
}

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

.hotspot-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.hotspot-area {
  position: absolute;
  pointer-events: auto;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: rgba(255, 192, 203, 0.3);
}

.hotspot-area:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.hotspot-area:active {
  background-color: rgba(255, 255, 255, 0.4);
}

.hotspot-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px dashed #ff5722;
}

.hotspot-area:not(:hover) .hotspot-label {
  display: none;
}
</style>
