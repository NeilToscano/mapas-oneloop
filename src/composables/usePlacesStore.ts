import { cuartosApi } from '@/apis'
import { usePlaceStore } from '@/stores/places'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
export const usePlacesStore = () => {
  const store = usePlaceStore()
  const { isUserlocationReady, isLoading, userLocation, places, isLoadingPlaces, roomLocation, primeraVezEntra, passTimeLogo } =
    storeToRefs(store)
  const {
    getIntialLocation,
    searchPlacesByTerm,
    setRoomLocation,
    cleanPlaces,
    setInitLocationRoom,
    setPrimeraVezEntra,
    setPassTimeLogo
  } = store

  onMounted(() => {
    if (!isUserlocationReady.value) {
      getIntialLocation()
    }
  })

  const sendFormInfo = async (formdata: FormData) => {
    const idToken = localStorage.getItem('idToken')
    try {
      const { data } = await cuartosApi.post('/form', formdata, {
        params: {
          access_token: idToken
        }
      })
      console.log(data)

      return {
        ok: true
      }
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        msg: 'Ocurrió un error'
      }
    }
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
    cleanPlaces,
    setInitLocationRoom,
    setPrimeraVezEntra,
    primeraVezEntra,
    passTimeLogo,
    setPassTimeLogo
  }
}
