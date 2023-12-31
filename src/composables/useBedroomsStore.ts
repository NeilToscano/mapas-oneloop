import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'

export const useBedroomsStore = () => {
  const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const radioTierra = 6371 // Radio de la Tierra en kilómetros

    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distancia = radioTierra * c

    return distancia
  }

  return {
    calcularDistancia
  }
}
