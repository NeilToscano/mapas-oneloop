import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import mapboxgl from 'mapbox-gl'
import type { Feature } from '@/interfaces/places'

export const useMapStore = defineStore('maponeloop', () => {
  const map = ref<mapboxgl.Map | null>(null)
  const markers = ref<mapboxgl.Marker[]>([])
  const distance = ref<number | null>(null)
  const duration = ref<number | null>(null)

  const isMapReady = computed(() => !!map.value)

  function setMap(mapbox: mapboxgl.Map) {
    map.value = mapbox
  }

  function setPlaceMarkers(places: Feature[]) {
    markers.value.forEach((marker) => marker.remove())
    markers.value = []
    // crear
    if (!map.value) return

    for (const place of places) {
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
  }
  return {
    map,
    markers,
    distance,
    duration,
    isMapReady,
    setMap,
    setPlaceMarkers
  }
})
