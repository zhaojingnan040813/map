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

export function transformProductData(apiData) {
  return apiData.map((item, index) => ({
    id: item.id || String(index + 1),
    name: item.name || '',
    shortDescription: item.summary || '',
    image: item.cover?.[0]?.url || ''
  }))
}

export function transformSingleProductData(item) {
  if (!item) return null
  return {
    id: item.id || '',
    name: item.name || '',
    shortDescription: item.summary || '',
    image: item.cover?.[0]?.url || '',
    details: {
      detailImages: [item.cover?.[0]?.url || ''],
      description: item.desc || '',
      contactName: item.contact || '',
      contactPhone: item.phone || '',
      address: item.manufacturer || ''
    }
  }
}
