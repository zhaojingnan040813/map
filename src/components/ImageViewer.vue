<template>
  <div 
    ref="containerRef" 
    class="image-viewer-container"
    :class="{ 'boundary-reached': showBoundaryFeedback }"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
  >
    <img 
      ref="imageRef"
      :src="imageSrc" 
      :alt="imageAlt"
      class="viewer-image"
      :class="[`fit-${fitMode}`, { pinching: isPinching }]"
      :style="{
        transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
        transformOrigin: 'center center'
      }"
      @load="handleImageLoad"
      draggable="false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const emit = defineEmits(['transform-change'])

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: ''
  },
  enableInertia: {
    type: Boolean,
    default: true
  },
  borderFeedback: {
    type: Boolean,
    default: true
  }
})

const containerRef = ref(null)
const imageRef = ref(null)
const showBoundaryFeedback = ref(false)

let isDragging = false
let startX = 0
let startY = 0
let currentX = 0
let currentY = 0
let velocityX = 0
let velocityY = 0
let lastMoveTime = 0
let lastMoveX = 0
let lastMoveY = 0
let animationId = null
let boundaryFeedbackTimeout = null

const imageInfo = ref({
  width: 0,
  height: 0,
  loaded: false
})

const containerInfo = ref({
  width: 0,
  height: 0
})

const fitMode = ref('width')
const scale = ref(1)
const translateX = ref(0)
const translateY = ref(0)

let isPinching = false
let lastDistance = 0
let lastPinchCenter = { x: 0, y: 0 }
let lastTapTime = 0

const handleImageLoad = () => {
  if (!imageRef.value) return
  
  imageInfo.value = {
    width: imageRef.value.naturalWidth,
    height: imageRef.value.naturalHeight,
    loaded: true
  }
  
  updateContainerInfo()
  calculateFitMode()
  setTimeout(() => emitTransformChange(), 0)
}

const updateContainerInfo = () => {
  if (!containerRef.value) return
  
  containerInfo.value = {
    width: containerRef.value.clientWidth,
    height: containerRef.value.clientHeight
  }
}

const calculateFitMode = () => {
  if (!imageInfo.value.loaded || !containerInfo.value.width || !containerInfo.value.height) {
    return
  }
  
  const imageRatio = imageInfo.value.width / imageInfo.value.height
  const containerRatio = containerInfo.value.width / containerInfo.value.height
  
  if (imageRatio > containerRatio) {
    fitMode.value = 'height'
  } else {
    fitMode.value = 'width'
  }
}

const emitTransformChange = () => {
  if (!imageRef.value || !containerRef.value || !imageInfo.value.loaded) {
    return
  }
  
  const rect = imageRef.value.getBoundingClientRect()
  const containerRect = containerRef.value.getBoundingClientRect()
  
  emit('transform-change', {
    scale: scale.value,
    translateX: translateX.value,
    translateY: translateY.value,
    displayWidth: rect.width / scale.value,
    displayHeight: rect.height / scale.value,
    offsetLeft: rect.left - containerRect.left,
    offsetTop: rect.top - containerRect.top
  })
}

const getBoundaries = () => {
  const maxX = Math.max(0, imageInfo.value.width - containerInfo.value.width)
  const maxY = Math.max(0, imageInfo.value.height - containerInfo.value.height)
  
  return {
    minX: 0,
    maxX,
    minY: 0,
    maxY
  }
}

const constrainPosition = (x, y) => {
  const boundaries = getBoundaries()
  
  const constrainedX = Math.max(boundaries.minX, Math.min(boundaries.maxX, x))
  const constrainedY = Math.max(boundaries.minY, Math.min(boundaries.maxY, y))
  
  const isAtBoundary = 
    constrainedX !== x || 
    constrainedY !== y ||
    constrainedX === boundaries.minX || 
    constrainedX === boundaries.maxX ||
    constrainedY === boundaries.minY || 
    constrainedY === boundaries.maxY
  
  if (isAtBoundary && props.borderFeedback) {
    triggerBoundaryFeedback()
  }
  
  return { x: constrainedX, y: constrainedY }
}

const triggerBoundaryFeedback = () => {
  showBoundaryFeedback.value = true
  
  if (boundaryFeedbackTimeout) {
    clearTimeout(boundaryFeedbackTimeout)
  }
  
  boundaryFeedbackTimeout = setTimeout(() => {
    showBoundaryFeedback.value = false
  }, 200)
}

const setScrollPosition = (x, y) => {
  if (!containerRef.value) return
  
  const constrained = constrainPosition(x, y)
  containerRef.value.scrollLeft = constrained.x
  containerRef.value.scrollTop = constrained.y
  currentX = constrained.x
  currentY = constrained.y
}

const getDistance = (touch1, touch2) => {
  const dx = touch2.clientX - touch1.clientX
  const dy = touch2.clientY - touch1.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

const getPinchCenter = (touch1, touch2) => {
  return {
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch1.clientY + touch2.clientY) / 2
  }
}

const handleDoubleTap = (e) => {
  const currentTime = Date.now()
  const tapGap = currentTime - lastTapTime
  
  if (tapGap < 300 && tapGap > 0) {
    const touch = e.touches[0]
    const rect = containerRef.value.getBoundingClientRect()
    const centerX = touch.clientX - rect.left
    const centerY = touch.clientY - rect.top
    
    if (scale.value > 1) {
      scale.value = 1
      translateX.value = 0
      translateY.value = 0
    } else {
      scale.value = 2
      const offsetX = (centerX - rect.width / 2) * (scale.value - 1)
      const offsetY = (centerY - rect.height / 2) * (scale.value - 1)
      translateX.value = -offsetX
      translateY.value = -offsetY
    }
    setTimeout(() => emitTransformChange(), 0)
  }
  
  lastTapTime = currentTime
}

const handleTouchStart = (e) => {
  if (!imageInfo.value.loaded) return
  
  if (e.touches.length === 2) {
    isPinching = true
    isDragging = false
    lastDistance = getDistance(e.touches[0], e.touches[1])
    lastPinchCenter = getPinchCenter(e.touches[0], e.touches[1])
  } else if (e.touches.length === 1) {
    if (!isPinching) {
      handleDoubleTap(e)
      isDragging = true
      
      const touch = e.touches[0]
      startX = touch.clientX + containerRef.value.scrollLeft
      startY = touch.clientY + containerRef.value.scrollTop
      
      lastMoveX = touch.clientX
      lastMoveY = touch.clientY
      lastMoveTime = Date.now()
      
      velocityX = 0
      velocityY = 0
    }
  }
  
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

const handleTouchMove = (e) => {
  if (!imageInfo.value.loaded) return
  
  e.preventDefault()
  
  if (e.touches.length === 2 && isPinching) {
    const currentDistance = getDistance(e.touches[0], e.touches[1])
    const currentCenter = getPinchCenter(e.touches[0], e.touches[1])
    
    if (lastDistance > 0) {
      const scaleChange = currentDistance / lastDistance
      let newScale = scale.value * scaleChange
      
      newScale = Math.max(1, Math.min(3, newScale))
      
      const rect = containerRef.value.getBoundingClientRect()
      const centerX = currentCenter.x - rect.left
      const centerY = currentCenter.y - rect.top
      
      const scaleRatio = newScale / scale.value
      
      translateX.value = centerX - (centerX - translateX.value) * scaleRatio
      translateY.value = centerY - (centerY - translateY.value) * scaleRatio
      
      scale.value = newScale
      emitTransformChange()
    }
    
    lastDistance = currentDistance
    lastPinchCenter = currentCenter
  } else if (e.touches.length === 1 && isDragging) {
    const touch = e.touches[0]
    const currentTime = Date.now()
    const deltaTime = currentTime - lastMoveTime
    
    if (deltaTime > 0) {
      velocityX = (touch.clientX - lastMoveX) / deltaTime
      velocityY = (touch.clientY - lastMoveY) / deltaTime
    }
    
    const newX = startX - touch.clientX
    const newY = startY - touch.clientY
    
    setScrollPosition(newX, newY)
    
    lastMoveX = touch.clientX
    lastMoveY = touch.clientY
    lastMoveTime = currentTime
  }
}

const handleTouchEnd = (e) => {
  if (e.touches.length < 2) {
    isPinching = false
    lastDistance = 0
  }
  
  if (e.touches.length === 0) {
    if (isDragging) {
      isDragging = false
      
      if (props.enableInertia && (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1)) {
        startInertiaScroll()
      }
    }
  }
}

const handleMouseDown = (e) => {
  if (!imageInfo.value.loaded) return
  
  isDragging = true
  
  startX = e.clientX + containerRef.value.scrollLeft
  startY = e.clientY + containerRef.value.scrollTop
  
  lastMoveX = e.clientX
  lastMoveY = e.clientY
  lastMoveTime = Date.now()
  
  velocityX = 0
  velocityY = 0
  
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  
  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    e.preventDefault()
    
    const currentTime = Date.now()
    const deltaTime = currentTime - lastMoveTime
    
    if (deltaTime > 0) {
      velocityX = (e.clientX - lastMoveX) / deltaTime
      velocityY = (e.clientY - lastMoveY) / deltaTime
    }
    
    const newX = startX - e.clientX
    const newY = startY - e.clientY
    
    setScrollPosition(newX, newY)
    
    lastMoveX = e.clientX
    lastMoveY = e.clientY
    lastMoveTime = currentTime
  }
  
  const handleMouseUp = () => {
    if (!isDragging) return
    
    isDragging = false
    
    if (props.enableInertia && (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1)) {
      startInertiaScroll()
    }
    
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const startInertiaScroll = () => {
  const friction = 0.95
  const threshold = 0.1
  
  const animate = () => {
    if (Math.abs(velocityX) < threshold && Math.abs(velocityY) < threshold) {
      animationId = null
      return
    }
    
    velocityX *= friction
    velocityY *= friction
    
    const newX = currentX - velocityX * 16
    const newY = currentY - velocityY * 16
    
    setScrollPosition(newX, newY)
    
    animationId = requestAnimationFrame(animate)
  }
  
  animationId = requestAnimationFrame(animate)
}

const handleResize = () => {
  updateContainerInfo()
  calculateFitMode()
  
  if (containerRef.value) {
    const constrained = constrainPosition(
      containerRef.value.scrollLeft,
      containerRef.value.scrollTop
    )
    setScrollPosition(constrained.x, constrained.y)
  }
  
  setTimeout(() => emitTransformChange(), 0)
}

const handleScroll = () => {
  emitTransformChange()
}

onMounted(() => {
  updateContainerInfo()
  window.addEventListener('resize', handleResize)
  window.addEventListener('orientationchange', handleResize)
  
  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('orientationchange', handleResize)
  
  if (containerRef.value) {
    containerRef.value.removeEventListener('scroll', handleScroll)
  }
  
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (boundaryFeedbackTimeout) {
    clearTimeout(boundaryFeedbackTimeout)
  }
})
</script>

<style scoped>
.image-viewer-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  cursor: grab;
  -webkit-overflow-scrolling: touch;
  background-color: #dfdcb8;
  transition: box-shadow 0.2s ease;
}

.image-viewer-container:active {
  cursor: grabbing;
}

.image-viewer-container.boundary-reached {
  box-shadow: inset 0 0 20px rgba(255, 87, 34, 0.3);
}

.viewer-image {
  display: block;
  user-select: none;
  pointer-events: none;
  transition: transform 0.3s ease-out;
  will-change: transform;
}

.viewer-image.pinching {
  transition: none;
}

.viewer-image.fit-width {
  width: 100%;
  height: auto;
  min-height: 100%;
}

.viewer-image.fit-height {
  width: auto;
  height: 100%;
  min-width: 100%;
}

.image-viewer-container::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}
</style>
