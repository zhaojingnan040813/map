<template>
  <DetailPageLayout
    v-if="recommendDetail"
    :title="recommendDetail.details.title"
    :image-url="recommendDetail.details.imageUrl"
    :info-items="infoItems"
    section-title="基地介绍"
    :introduction="recommendDetail.details.introduction"
    @back="goBack"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import recommendationsData from '../../data/recommendations.json'
import DetailPageLayout from '../../components/detail/DetailPageLayout.vue'

const route = useRoute()
const router = useRouter()
const recommendDetail = ref(null)

onMounted(() => {
  const id = parseInt(route.params.id)
  recommendDetail.value = recommendationsData.recommendations.find(r => r.id === id)
})

const infoItems = computed(() => {
  if (!recommendDetail.value) return []
  return [
    {
      icon: '📍',
      label: '详细地址',
      value: recommendDetail.value.details.address
    },
    {
      icon: '👤',
      label: '联系人',
      value: `${recommendDetail.value.details.contactName}：${recommendDetail.value.details.contactPhone}`
    }
  ]
})

const goBack = () => {
  router.push({ name: 'Recommend' })
}
</script>
