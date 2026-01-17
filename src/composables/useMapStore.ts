import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'

export const useMapsStore = () => {
  const store = useMapStore()
  const { map, distance, duration, isMapReady } = storeToRefs(store)
  const { setMap, setPlaceMarkers } = store

  return {
    map,
    setMap,
    isMapReady,
    setPlaceMarkers
  }
}
