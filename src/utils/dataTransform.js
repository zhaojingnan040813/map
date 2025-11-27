export function transformRouteData(apiData) {
  return apiData.map((item, index) => ({
    id: item.id || String(index + 1),
    imageUrl: item.cover?.[0]?.url || '',
    title: item.name || '',
    description: item.desc || '',
    address: item.address || '',
    contact: item.phone || '',
    detailImageUrl: item.detail?.[0]?.url || ''
  }))
}

export function transformRecommendData(apiData) {
  return apiData.map((item, index) => ({
    id: item.id || String(index + 1),
    imageUrl: item.cover?.[0]?.url || '',
    title: item.name || '',
    description: item.desc || '',
    address: item.address || '',
    contact: item.phone || '',
    details: {
      title: item.name || '',
      imageUrl: item.cover?.[0]?.url || '',
      address: item.address || '',
      contactName: item.contact || '',
      contactPhone: item.phone || '',
      introduction: item.desc || ''
    }
  }))
}

export function transformSingleRouteData(item) {
  if (!item) return null
  return {
    id: item.id || '',
    imageUrl: item.cover?.[0]?.url || '',
    title: item.name || '',
    description: item.desc || '',
    address: item.address || '',
    contact: item.phone || '',
    detailImageUrl: item.detail?.[0]?.url || ''
  }
}

export function transformSingleRecommendData(item) {
  if (!item) return null
  return {
    id: item.id || '',
    imageUrl: item.cover?.[0]?.url || '',
    title: item.name || '',
    description: item.desc || '',
    address: item.address || '',
    contact: item.phone || '',
    details: {
      title: item.name || '',
      imageUrl: item.cover?.[0]?.url || '',
      address: item.address || '',
      contactName: item.contact || '',
      contactPhone: item.phone || '',
      introduction: item.desc || ''
    }
  }
}
