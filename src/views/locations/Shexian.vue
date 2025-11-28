<template>
  <div class="shexian-container">
    <ImageViewer 
      ref="imageViewerRef"
      :image-src="locationImage"
      image-alt="歙县"
      :enable-inertia="true"
      :border-feedback="true"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ImageViewer from '../../components/ImageViewer.vue'
import locationImage from '../../png/didian/歙县.png'
import hotspotsData from '../../data/hotspots.json'

const router = useRouter()
const imageViewerRef = ref(null)
const hotspots = ref(hotspotsData.shexianHotspots)
const imageSize = hotspotsData.shexianImageSize

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
</script>

<style scoped>
.shexian-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
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
</style>
