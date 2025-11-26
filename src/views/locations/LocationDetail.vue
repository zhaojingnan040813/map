<template>
  <DetailPageLayout
    v-if="detail"
    :title="detail.title"
    :image-url="detail.imageUrl"
    :info-items="infoItems"
    section-title="基地介绍"
    :introduction="detail.introduction"
    @back="goBack"
  />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import locationData from '../../data/location-details.json'
import DetailPageLayout from '../../components/detail/DetailPageLayout.vue'

const route = useRoute()
const router = useRouter()
const detail = ref(null)
const locationId = ref('')

onMounted(() => {
  locationId.value = route.params.location
  const detailId = route.params.id
  
  const location = locationData.locations.find(l => l.id === locationId.value)
  if (location) {
    detail.value = location.details.find(d => d.id === detailId)
  }
})

const infoItems = computed(() => {
  if (!detail.value) return []
  return [
    {
      icon: '📍',
      label: '详细地址',
      value: detail.value.address
    },
    {
      icon: '👤',
      label: '联系人',
      value: `${detail.value.contactName}：${detail.value.contactPhone}`
    }
  ]
})

const goBack = () => {
  router.push({ name: locationId.value.charAt(0).toUpperCase() + locationId.value.slice(1) })
}
</script>
