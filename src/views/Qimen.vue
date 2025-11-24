<template>
  <div class="qimen-page">
    <div class="content">
      <h1>祁门县</h1>
      <p class="description">
        祁门县位于安徽省南部，是中国红茶之乡，以祁门红茶闻名于世。
      </p>
      <div class="info-section">
        <h2>景点介绍</h2>
        <p>这里将展示祁门县的详细介绍内容...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.qimen-page {
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  color: #667eea;
  margin-bottom: 15px;
}

.info-section p {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
}
</style>
