<template>
  <div class="yixian-page">
    <div class="content">
      <h1>黟县</h1>
      <p class="description">
        黟县位于安徽省南部，拥有西递、宏村等世界文化遗产，是徽州文化的重要发源地。
      </p>
      <div class="info-section">
        <h2>景点介绍</h2>
        <p>这里将展示黟县的详细介绍内容...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.yixian-page {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.content {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 36px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.description {
  font-size: 18px;
  color: #666;
  line-height: 1.8;
  margin-bottom: 30px;
  text-align: center;
}

.info-section {
  margin-top: 30px;
}

.info-section h2 {
  font-size: 24px;
  color: #f5576c;
  margin-bottom: 15px;
}

.info-section p {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
}
</style>
