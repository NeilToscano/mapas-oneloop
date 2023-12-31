import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import mapboxgl from 'mapbox-gl'
import type { Feature } from '@/interfaces/places'
import { cuartosApi } from '@/apis'

export const useMapStore = defineStore('maponeloop', () => {
  const map = ref<mapboxgl.Map | null>(null)
  const markers = ref<mapboxgl.Marker[]>([])
  const distance = ref<number | null>(null)
  const duration = ref<number | null>(null)
  const cardMap = ref<boolean>(false)
  const roomsList = ref(null)
  const roomSelected = ref<any>(null)
  // valore cardMap

  const isMapReady = computed(() => !!map.value)
  function setMap(mapbox: mapboxgl.Map) {
    map.value = mapbox
  }

  function toggleCardMap() {
    cardMap.value = !cardMap.value
  }

  async function setPlaceMarkers(places: Feature[]) {
    markers.value.forEach((marker) => marker.remove())
    markers.value = []
    // crear
    if (!map.value)  return ;


    for (const place of places) {
      console.log('llega hasta',place);
      const [lng, lat] = place.center

      const popup = new mapboxgl.Popup().setLngLat([lng, lat]).setHTML(
        `
          <h4>${place.text}</h4>
          <p>${place.place_name}</p>
          `
      )

      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(map.value)

      markers.value.push(marker)
    }

    // todo list of positions Obtener Lista
    
    try {
      const { data } = await cuartosApi.get('/form')
      roomsList.value = data.msg
      console.log(data, 'data')
      const arrayUbic = data.msg
      for (const element of arrayUbic) {
        const circleElement = document.createElement('div')
        circleElement.style.width = '20px'
        circleElement.style.height = '20px'
        circleElement.style.borderRadius = '50%'
        circleElement.style.backgroundColor = 'purple' // Color del círculo (puedes cambiarlo según tus preferencias)
        circleElement.style.opacity = '0.7' // Opacidad del círculo

        if (!map.value) return
        const ubicString = element.roomLoc
        const ubiLoc: [number, number] = JSON.parse(ubicString)

        const popup2 = new mapboxgl.Popup().setHTML(
          `
              <p> location room</p>
            `
        )

        const marker2 = new mapboxgl.Marker({ color: 'orange', element: circleElement })
          .setPopup(popup2)
          .setLngLat([ubiLoc[0], ubiLoc[1]])
          .addTo(map.value)

        marker2.getElement().addEventListener('click', async function (event) {
          console.log(element, 'element')
          roomSelected.value = element
          toggleCardMap()
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return {
    map,
    markers,
    distance,
    duration,
    isMapReady,
    setMap,
    setPlaceMarkers,
    cardMap,
    toggleCardMap,
    roomSelected
  }
})
