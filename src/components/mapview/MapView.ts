import mapboxgl from 'mapbox-gl'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useMapsStore, usePlacesStore } from '@/composables'

export default defineComponent({
  name: 'MapView',

  setup() {
    const router = useRouter()
    const { isLoading, userLocation, isUserlocationReady, setRoomLocation } = usePlacesStore()
    const { setMap } = useMapsStore()
    const mapElement = ref<HTMLDivElement>()

    const initMap = async () => {
      if (!mapElement.value) return
      if (!userLocation.value) return
      await Promise.resolve()
      const map = new mapboxgl.Map({
        container: mapElement.value, // container ID
        style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
        center: userLocation.value, // starting position [lng, lat]
        zoom: 15 // starting zoom
      })
      const nav = new mapboxgl.NavigationControl({ showCompass: true, visualizePitch: true })

      const popup = new mapboxgl.Popup({ anchor: 'right' })
        .setLngLat(userLocation.value)
        .setHTML(
          `<p>Mi Ubicación!</p>
           <button type="button" class='volverPlaces btn btn-primary'> Establecer posición</button>
          `
        )
        .setMaxWidth('300px')

      map.addControl(nav, 'bottom-left')

      // todo agregar markador
      const myLocationMarker = new mapboxgl.Marker({ color: 'red', draggable: true })
        .setLngLat(userLocation.value)
        .setPopup(popup)
        .addTo(map)

      //todo  redirigir en el popup a la pantalla de logueado
      popup.on('open', () => {
        popup
          .getElement()
          .querySelector('.volverPlaces')
          ?.addEventListener('click', () => {
            goRoute('infoplace')
          })
      })

      // todo Cada vez que arrastramos nuestra posicion se establece un nuevo valor
      myLocationMarker.on('dragend', () => {
        const newPosition = myLocationMarker.getLngLat() // Obtener la nueva posición del marcador
        setRoomLocation([newPosition.lng, newPosition.lat])
        // Aquí puedes realizar acciones con la nueva posición, como enviarla al servidor o actualizar otra información
      })

      // todo establecer mapa en Pinia
      setMap(map)
    }

    onMounted(() => {
      if (isUserlocationReady.value) return initMap()
      console.log('No tengo localizacion')
      console.log(mapElement.value)
    })
    watch(isUserlocationReady, async (newVal) => {
      if (newVal) {
        return initMap()
      }
    })

    const goRoute = (routeval: string) => {
      router.push({ name: routeval })
    }

    return {
      isLoading,
      userLocation,
      isUserlocationReady,
      mapElement,
      goRoute,
    }
  }
})
