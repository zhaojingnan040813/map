<template>
  <div class="picker-page">
    <CoordinatePicker :image-src="homeImage" />
  </div>
</template>

<script setup>
import CoordinatePicker from '../components/CoordinatePicker.vue'
import homeImage from '../png/首页.png'
</script>

<style scoped>
.picker-page {
  width: 100%;
  height: 100vh;
}
</style>
