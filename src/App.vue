<script setup>
import ImageNav from './components/ImageNav.vue'
</script>

<template>
  <div id="app">
    <router-view></router-view>
    <ImageNav />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
}
</style>
