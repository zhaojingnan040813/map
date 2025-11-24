<template>
  <div class="coordinate-picker">
    <img 
      ref="imgRef"
      :src="imageSrc" 
      @click="handleClick"
      @mousemove="handleMouseMove"
      class="picker-image"
      draggable="false"
    />
    
    <div class="info-panel">
      <h3>🎯 坐标拾取器</h3>
      
      <div class="current-position">
        <h4>当前鼠标位置</h4>
        <p>百分比: {{ currentPercent.left }}%, {{ currentPercent.top }}%</p>
        <p>像素: {{ currentPixel.x }}px, {{ currentPixel.y }}px</p>
      </div>
      
      <div class="points-list">
        <h4>已标记点 ({{ clickedPoints.length }})</h4>
        <div v-for="(point, index) in clickedPoints" :key="index" class="point-item">
          <span>点{{ index + 1 }}: {{ point.left }}%, {{ point.top }}%</span>
          <button @click="removePoint(index)" class="btn-remove">×</button>
        </div>
      </div>
      
      <div class="actions">
        <button @click="clearPoints" class="btn-clear">清除所有</button>
        <button @click="copyConfig" class="btn-copy" :disabled="clickedPoints.length < 2">
          复制配置
        </button>
      </div>
      
      <div class="tips">
        <h4>💡 使用提示</h4>
        <ol>
          <li>点击区域左上角</li>
          <li>点击区域右下角</li>
          <li>点击"复制配置"</li>
        </ol>
      </div>
    </div>
    
    <div 
      v-for="(point, index) in clickedPoints"
      :key="index"
      class="marker"
      :style="{
        left: point.left + '%',
        top: point.top + '%'
      }"
    >
      {{ index + 1 }}
    </div>
    
    <div 
      v-if="clickedPoints.length >= 2"
      class="preview-area"
      :style="{
        left: Math.min(clickedPoints[0].left, clickedPoints[clickedPoints.length - 1].left) + '%',
        top: Math.min(clickedPoints[0].top, clickedPoints[clickedPoints.length - 1].top) + '%',
        width: Math.abs(clickedPoints[clickedPoints.length - 1].left - clickedPoints[0].left) + '%',
        height: Math.abs(clickedPoints[clickedPoints.length - 1].top - clickedPoints[0].top) + '%'
      }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  imageSrc: {
    type: String,
    required: true
  }
})

const imgRef = ref(null)
const currentPercent = ref({ left: '0.00', top: '0.00' })
const currentPixel = ref({ x: 0, y: 0 })
const clickedPoints = ref([])

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  currentPixel.value = { x: Math.round(x), y: Math.round(y) }
  currentPercent.value = {
    left: (x / rect.width * 100).toFixed(2),
    top: (y / rect.height * 100).toFixed(2)
  }
}

const handleClick = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  
  clickedPoints.value.push({
    left: parseFloat((x / rect.width * 100).toFixed(2)),
    top: parseFloat((y / rect.height * 100).toFixed(2))
  })
}

const removePoint = (index) => {
  clickedPoints.value.splice(index, 1)
}

const clearPoints = () => {
  clickedPoints.value = []
}

const copyConfig = () => {
  if (clickedPoints.value.length < 2) {
    alert('请至少点击两个点（区域左上角和右下角）')
    return
  }
  
  const p1 = clickedPoints.value[0]
  const p2 = clickedPoints.value[clickedPoints.value.length - 1]
  
  const config = {
    left: Math.min(p1.left, p2.left).toFixed(2) + '%',
    top: Math.min(p1.top, p2.top).toFixed(2) + '%',
    width: Math.abs(p2.left - p1.left).toFixed(2) + '%',
    height: Math.abs(p2.top - p1.top).toFixed(2) + '%'
  }
  
  const configText = JSON.stringify(config, null, 2)
  
  navigator.clipboard.writeText(configText).then(() => {
    alert('✅ 配置已复制到剪贴板！\n\n' + configText)
  }).catch(() => {
    prompt('复制以下配置：', configText)
  })
}
</script>

<style scoped>
.coordinate-picker {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  background: #f0f0f0;
}

.picker-image {
  display: block;
  max-width: 100%;
  height: auto;
  cursor: crosshair;
  user-select: none;
}

.info-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 20px;
  border-radius: 12px;
  min-width: 280px;
  max-width: 350px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.info-panel h3 {
  margin: 0 0 15px 0;
  font-size: 18px;
  border-bottom: 2px solid #4CAF50;
  padding-bottom: 10px;
}

.info-panel h4 {
  margin: 15px 0 8px 0;
  font-size: 14px;
  color: #4CAF50;
}

.current-position {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
}

.current-position p {
  margin: 5px 0;
  font-size: 13px;
  font-family: 'Courier New', monospace;
}

.points-list {
  margin: 15px 0;
}

.point-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 10px;
  margin: 5px 0;
  border-radius: 4px;
  font-size: 13px;
  font-family: 'Courier New', monospace;
}

.btn-remove {
  background: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  padding: 0;
  transition: background 0.2s;
}

.btn-remove:hover {
  background: #d32f2f;
}

.actions {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.actions button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.2s;
}

.btn-clear {
  background: #ff9800;
  color: white;
}

.btn-clear:hover {
  background: #f57c00;
}

.btn-copy {
  background: #4CAF50;
  color: white;
}

.btn-copy:hover:not(:disabled) {
  background: #45a049;
}

.btn-copy:disabled {
  background: #555;
  cursor: not-allowed;
  opacity: 0.5;
}

.tips {
  background: rgba(33, 150, 243, 0.2);
  padding: 10px;
  border-radius: 6px;
  margin-top: 15px;
}

.tips ol {
  margin: 8px 0 0 0;
  padding-left: 20px;
  font-size: 12px;
  line-height: 1.8;
}

.marker {
  position: absolute;
  width: 30px;
  height: 30px;
  background: #f44336;
  border: 3px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.preview-area {
  position: absolute;
  border: 3px dashed #4CAF50;
  background: rgba(76, 175, 80, 0.2);
  pointer-events: none;
  z-index: 50;
}

@media (max-width: 768px) {
  .info-panel {
    top: 10px;
    right: 10px;
    left: 10px;
    min-width: auto;
    max-width: none;
  }
}
</style>
