import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { searchApi } from '@/apis'
import type { Feature, PlaceResponse } from '../interfaces/places.ts'

export const usePlaceStore = defineStore('place', () => {
  const isLoading = ref(true)
  const userLocation = ref<[number, number] | null>(null)
  const roomLocation = ref<[number, number] | null>(null)

  const places = ref<Feature[]>([])
  const isLoadingPlaces = ref<boolean>(false)

  const isUserlocationReady = computed(() => !!userLocation.value)

  function cleanPlaces() {
    places.value = []
  }

  function getIntialLocation() {
    // todo: colocar Loading
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords)
        userLocation.value = [position.coords.longitude, position.coords.latitude]
        isLoading.value = false
      },
      (err) => {
        console.log(err)
        throw new Error('No geolocation:( ')
      }
    )
  }
  function setIsLoadingPlaces() {
    isLoadingPlaces.value = true
  }
  function setPlaces(placesMap: Feature[]) {
    places.value = placesMap
    isLoadingPlaces.value = false
  }
  // todo Colocar el Valor de Retorno
  async function searchPlacesByTerm(query: string) {
    if (query.length === 0) {
      setPlaces([])
      //todo setplaces
      return []
    }
    if (!userLocation.value) {
      throw new Error('No hay ubicación del usuario')
    }
    setIsLoadingPlaces()
    const res = await searchApi.get<PlaceResponse>(`/${query}.json`, {
      params: {
        proximity: userLocation.value.join(',')
      }
    })
    console.log(res);
    setPlaces(res.data.features)
    return res.data.features
  }

  function setRoomLocation(roomLoc: [number, number]) {
    roomLocation.value = roomLoc
  }

  return {
    isLoading,
    userLocation,
    isUserlocationReady,
    getIntialLocation,
    searchPlacesByTerm,
    places,
    isLoadingPlaces,
    setRoomLocation,
    roomLocation,
    cleanPlaces
  }
})
