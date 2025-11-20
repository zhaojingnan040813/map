<script setup>
import TabBar from './components/TabBar.vue'
</script>

<template>
  <div id="app">
    <router-view></router-view>
    <TabBar />
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
}
</style>
