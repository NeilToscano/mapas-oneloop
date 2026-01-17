import { cuartosApi } from '@/apis'
import { useCardRoom } from '@/stores/cardroom'
import mapboxgl from 'mapbox-gl'
import { storeToRefs } from 'pinia'

export const useRoom = () => {
  const store = useCardRoom()
  const { cardMap, roomSelected, roomsList } = storeToRefs(store)
  const { toggleCardMap } = store

  async function setRoomMarkers(map: mapboxgl.Map) {
    try {
      const { data } = await cuartosApi.get('/form')
      roomsList.value = data.msg
      const arrayUbic = data.msg
      for (const placeitem of arrayUbic) {
        const circleElement = document.createElement('div')
        circleElement.style.width = '20px'
        circleElement.style.height = '20px'
        circleElement.style.borderRadius = '50%'
        circleElement.style.backgroundColor = 'purple'
        circleElement.style.opacity = '0.7'

        if (!map) return
        const ubicString = placeitem.roomLoc
        const ubiLoc: [number, number] = JSON.parse(ubicString)

        const popup2 = new mapboxgl.Popup().setHTML(
          `
            <p>Habitación Disponible</p>
          `
        )

        const marker2 = new mapboxgl.Marker({ color: 'orange', element: circleElement })
          .setPopup(popup2)
          .setLngLat([ubiLoc[0], ubiLoc[1]])
          .addTo(map)

        marker2.getElement().addEventListener('click', async function () {
          roomSelected.value = placeitem
          toggleCardMap()
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    setRoomMarkers,
    cardMap,
    roomsList,
    roomSelected,
    toggleCardMap
  }
}
