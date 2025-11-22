<script setup>
import ImageNav from './components/ImageNav.vue'
</script>

<template>
  <div class="app-wrapper">
    <router-view></router-view>
    <ImageNav />
  </div>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100vh;
  background-color: #dfdcb8;
  overflow-y: auto;
}
</style>
