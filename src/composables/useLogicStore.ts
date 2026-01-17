import mapboxgl from 'mapbox-gl'
type lngLat = [number, number]
type callback = (data: lngLat) => void

export const useLogicStore = () => {
  //   TODO  Cada vez que arrastramos nuestra posicion se establece un nuevo valor
  function setPositionMarker(myLocationMarker: mapboxgl.Marker, setRoomLocation: callback) {
    myLocationMarker.on('dragend', () => {
      const newPosition = myLocationMarker.getLngLat()
      setRoomLocation([newPosition.lng, newPosition.lat])
    })
  }

  return {
    setPositionMarker
  }
}
