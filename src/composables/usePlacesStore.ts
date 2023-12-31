import { cuartosApi } from '@/apis'
import { usePlaceStore } from '@/stores/places'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
export const usePlacesStore = () => {
  const store = usePlaceStore()
  const { isUserlocationReady, isLoading, userLocation, places, isLoadingPlaces, roomLocation } =
    storeToRefs(store);
  const { getIntialLocation, searchPlacesByTerm, setRoomLocation, cleanPlaces } = store;
  onMounted(() => {
    if (!isUserlocationReady.value) {
      getIntialLocation()
    }
  })

  const sendFormInfo = async (formdata: FormData) => {
    const data = await cuartosApi.post('/form', formdata);
  }

  return {
    isLoading,
    userLocation,
    isUserlocationReady,
    searchPlacesByTerm,
    places,
    isLoadingPlaces,
    setRoomLocation,
    roomLocation,
    sendFormInfo,
    cleanPlaces
  }
}
