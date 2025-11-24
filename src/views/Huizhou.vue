<template>
  <div class="location-page">
    <ImageViewer 
      :image-src="locationImage"
      image-alt="徽州区"
      :enable-inertia="true"
      :border-feedback="true"
    />
  </div>
</template>

<script setup>
import ImageViewer from '../components/ImageViewer.vue'
import locationImage from '../png/didian/徽州区.png'
</script>

<style scoped>
.location-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
