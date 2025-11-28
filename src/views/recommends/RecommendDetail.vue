<template>
  <div class="recommend-detail-page">
    <div v-if="loading" class="loading-state">加载中...</div>
    <div v-else-if="error" class="error-state">{{ error }}</div>
    <DetailPageLayout
      v-else-if="recommendDetail"
      :title="recommendDetail.details.title"
      :image-url="recommendDetail.details.imageUrl"
      :info-items="infoItems"
      section-title="基地介绍"
      :introduction="recommendDetail.details.introduction"
      @back="goBack"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DetailPageLayout from '../../components/detail/DetailPageLayout.vue'
import { getRecommendById } from '@/api/recommend'
import { transformSingleRecommendData } from '@/utils/dataTransform'
import locationIcon from '@/assets/location.svg'
import phoneIcon from '@/assets/phone.svg'

const route = useRoute()
const router = useRouter()
const recommendDetail = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    const id = route.params.id
    const result = await getRecommendById(id)
    if (result.status === 'success' && result.result?.data?.length > 0) {
      recommendDetail.value = transformSingleRecommendData(result.result.data[0])
    } else {
      error.value = '未找到推荐数据'
    }
  } catch (err) {
    error.value = '数据加载失败，请稍后重试'
    console.error('推荐详情 API 请求失败:', err)
  } finally {
    loading.value = false
  }
})

const infoItems = computed(() => {
  if (!recommendDetail.value?.details) return []
  return [
    {
      icon: locationIcon,
      iconType: 'svg',
      label: '详细地址',
      value: recommendDetail.value.details.address
    },
    {
      icon: phoneIcon,
      iconType: 'svg',
      label: '联系人',
      value: `${recommendDetail.value.details.contactName}：${recommendDetail.value.details.contactPhone}`
    }
  ]
})

const goBack = () => {
  router.push({ name: 'Recommend' })
}
</script>

<style scoped>
.recommend-detail-page {
  width: 100%;
  min-height: 100vh;
}

.loading-state,
.error-state {
  padding: 60px 20px;
  font-size: 18px;
  color: #675529;
  text-align: center;
}

.error-state {
  color: #dc2626;
}
</style>
