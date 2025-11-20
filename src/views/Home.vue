<template>
  <div class="home-container">
    <div 
      class="background-wrapper"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <div 
        class="background-image"
        :style="{
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          transformOrigin: 'center center'
        }"
      >
        <img src="../png/首页.png" alt="首页背景" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)

let lastDistance = 0
let lastTouches = null
let isPinching = false
let isDragging = false
let startX = 0
let startY = 0

const getDistance = (touch1, touch2) => {
  const dx = touch2.clientX - touch1.clientX
  const dy = touch2.clientY - touch1.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

const handleTouchStart = (e) => {
  if (e.touches.length === 2) {
    isPinching = true
    isDragging = false
    lastDistance = getDistance(e.touches[0], e.touches[1])
    lastTouches = {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2
    }
  } else if (e.touches.length === 1) {
    isDragging = true
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
  }
}

const handleTouchMove = (e) => {
  if (e.touches.length === 2 && isPinching) {
    e.preventDefault()
    
    const currentDistance = getDistance(e.touches[0], e.touches[1])
    const currentTouches = {
      x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
      y: (e.touches[0].clientY + e.touches[1].clientY) / 2
    }
    
    if (lastDistance > 0) {
      const scaleChange = currentDistance / lastDistance
      scale.value = scale.value * scaleChange
    }
    
    if (lastTouches) {
      const dx = currentTouches.x - lastTouches.x
      const dy = currentTouches.y - lastTouches.y
      translateX.value += dx
      translateY.value += dy
    }
    
    lastDistance = currentDistance
    lastTouches = currentTouches
  } else if (e.touches.length === 1 && isDragging) {
    e.preventDefault()
    
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    
    const dx = currentX - startX
    const dy = currentY - startY
    
    translateX.value += dx
    translateY.value += dy
    
    startX = currentX
    startY = currentY
  }
}

const handleTouchEnd = (e) => {
  if (e.touches.length < 2) {
    isPinching = false
    lastDistance = 0
    lastTouches = null
  }
  if (e.touches.length === 0) {
    isDragging = false
  }
}
</script>

<style scoped>
.home-container {
  width: 100%;
  height: calc(100vh - 60px);
  overflow: hidden;
  position: relative;
}

.background-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  touch-action: none;
  background-color: #dfdcb8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-image {
  width: 100%;
  /* height: 100%; */
  /* transition: transform 0.1s ease-out; */
}

.background-image img {
  width: 100%;
  /* height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none; */
}

@media screen and (max-width: 767px) {
  .background-image {
    height: 100%;
  }
  
  .background-image img {
    height: 100%;
    object-fit: cover;
  }
}
</style>
