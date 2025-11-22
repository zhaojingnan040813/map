<template>
  <div class="route-card">
    <div class="route-image">
      <img :src="imageUrl" :alt="title" />
    </div>
    <div class="route-content">
      <h3 class="route-title">{{ title }}</h3>
      <p class="route-description">{{ description }}</p>
      <div class="route-info">
        <div class="info-item">
          <span class="info-icon">📍</span>
          <span class="info-text">{{ address }}</span>
        </div>
        <div class="info-item">
          <span class="info-icon">📞</span>
          <span class="info-text">{{ contact }}</span>
        </div>
      </div>
      <button class="learn-more-btn" @click="goToDetail">了解更多</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
})

const router = useRouter()

const goToDetail = () => {
  router.push({ name: 'RouteDetail', params: { id: props.id } })
}
</script>

<style scoped>
.route-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: auto;
  min-height: 200px;
}

.route-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

.route-image {
  width: 300px;
  min-width: 300px;
  flex-shrink: 0;
  overflow: hidden;
  background: #f5f5f5;
}

.route-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  min-height: 200px;
}

.route-card:hover .route-image img {
  transform: scale(1.05);
}

.route-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 70px;
}

.route-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.route-description {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin: 0 0 16px 0;
  flex: 1;
}

.route-info {
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: #666;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-icon {
  font-size: 16px;
  margin-right: 8px;
  flex-shrink: 0;
}

.info-text {
  line-height: 1.5;
}

.learn-more-btn {
  position: absolute;
  bottom: 24px;
  right: 24px;
  padding: 10px 24px;
  background: linear-gradient(135deg, #c3bb9c 0%, #929089 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.learn-more-btn:hover {
  background: linear-gradient(135deg, #929089 0%, #c3bb9c 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(146, 144, 137, 0.4);
}

.learn-more-btn:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .route-card {
    flex-direction: column;
    min-height: auto;
  }

  .route-image {
    width: 100%;
    min-width: 100%;
    height: 180px;
  }

  .route-image img {
    min-height: 180px;
  }

  .route-content {
    padding: 16px;
    padding-bottom: 60px;
  }

  .route-title {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .route-description {
    font-size: 13px;
    margin-bottom: 12px;
    line-height: 1.6;
  }

  .info-item {
    font-size: 12px;
    margin-bottom: 6px;
  }

  .info-icon {
    font-size: 14px;
  }

  .learn-more-btn {
    padding: 8px 20px;
    font-size: 13px;
    bottom: 16px;
    right: 16px;
  }
}
</style>
