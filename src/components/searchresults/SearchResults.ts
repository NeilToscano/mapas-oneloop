import { useRoom, useMapsStore, usePlacesStore } from '@/composables'
import { useBedroomsStore } from '@/composables/useBedroomsStore'
import type { Feature } from '@/interfaces/places'

import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'SearchResults',

  setup() {
    const { places, isLoadingPlaces, cleanPlaces } = usePlacesStore()
    const activePlace = ref('')
    const { map, setPlaceMarkers } = useMapsStore()
    const { calcularDistancia } = useBedroomsStore()
    const { setRoomMarkers } = useRoom()

    watch(places, (newValue, oldValue) => {
      activePlace.value = ''
      if (places.value.length > 0) {
        console.log(places.value)
        setPlaceMarkers(places.value)
        if (!map.value) return
        setRoomMarkers(map.value)
      }
    })
    const puntosUbi = [
      -77.01742294572551, -12.051386789932414, -77.017721606414, -12.04129088692608
    ]
    return {
      places,
      isLoadingPlaces,
      activePlace,
      onPlaceClicked: (place: Feature) => {
        activePlace.value = place.id
        const [lng, lat] = place.center
        map.value?.flyTo({
          center: [lng, lat],
          zoom: 14
        })
        cleanPlaces()
        const distancia = calcularDistancia(puntosUbi[1], puntosUbi[0], puntosUbi[3], puntosUbi[2])
        console.log(distancia)
      }
    }
  }
})
