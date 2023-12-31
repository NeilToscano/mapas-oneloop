import { useMapStore } from '@/stores/map'
import { storeToRefs } from 'pinia'

export const useMapsStore = () => {
  const store = useMapStore()
  const { map, distance, duration, isMapReady, cardMap, roomSelected } = storeToRefs(store)
  const { setMap, setPlaceMarkers, toggleCardMap } = store

  return {
    map,
    setMap,
    isMapReady,
    setPlaceMarkers,
    cardMap,
    toggleCardMap,
    roomSelected
  }
}
