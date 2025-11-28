<template>
  <div class="home-container">
    <ImageViewer 
      ref="imageViewerRef"
      :image-src="currentImage"
      image-alt="首页背景"
      :enable-inertia="true"
      :border-feedback="true"
      :class="{ 'image-loaded': isHighQualityLoaded }"
      @transform-change="handleTransformChange"
    />
    
    <div class="hotspot-layer">
      <div 
        v-for="hotspot in hotspots"
        :key="hotspot.id"
        class="hotspot-area"
        :style="getHotspotStyle(hotspot)"
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import ImageViewer from '../components/ImageViewer.vue'
import lowQualityImage from '../png/首页-模糊.png'
import highQualityImage from '../png/首页.png'
import hotspotsData from '../data/hotspots.json'

const router = useRouter()
const imageViewerRef = ref(null)
const currentImage = ref(lowQualityImage)
const isHighQualityLoaded = ref(false)
const hotspots = ref(hotspotsData.homeHotspots)
const imageSize = hotspotsData.imageSize
const debugMode = ref(false)

const imageTransform = ref({
  scale: 1,
  translateX: 0,
  translateY: 0,
  displayWidth: 0,
  displayHeight: 0,
  offsetLeft: 0,
  offsetTop: 0
})

const handleTransformChange = (transform) => {
  imageTransform.value = { ...transform }
}

const getHotspotStyle = (hotspot) => {
  const transform = imageTransform.value
  
  if (!transform.displayWidth || !transform.displayHeight) {
    return { display: 'none' }
  }

  const scaleX = transform.displayWidth / imageSize.width
  const scaleY = transform.displayHeight / imageSize.height
  
  const screenX = hotspot.x * scaleX * transform.scale + transform.offsetLeft + transform.translateX
  const screenY = hotspot.y * scaleY * transform.scale + transform.offsetTop + transform.translateY
  const screenWidth = hotspot.width * scaleX * transform.scale
  const screenHeight = hotspot.height * scaleY * transform.scale
  
  return {
    left: `${screenX}px`,
    top: `${screenY}px`,
    width: `${screenWidth}px`,
    height: `${screenHeight}px`
  }
}

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
  background-color: transparent;
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
