import mapboxgl from 'mapbox-gl'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useLogicStore, useMapsStore, usePlacesStore } from '@/composables'
import { useLogin } from '@/composables/useAuth'


export default defineComponent({
  name: 'MapView',

  setup() {
    const router = useRouter()
    const mapElement = ref<HTMLDivElement>()
    const { isLoading, userLocation, isUserlocationReady, setRoomLocation, setInitLocationRoom, primeraVezEntra, setPrimeraVezEntra, passTimeLogo, setPassTimeLogo } =
      usePlacesStore()
    const { setMap } = useMapsStore()
    const { setPositionMarker } = useLogicStore()
    const { stateUser } = useLogin()

    const popupUser = `<div>
      <span>Puedes mover el marcador</span>
      <br />
      <span>para Cambiar de posición</span>
      </div>
      <button type="button" class='volverPlaces btn btn-primary'> Establecer posición</button>`

    const popupCliente = `
          <div style="background-color: #32969c; padding: 3px; border-radius:5%; text-align: center;">
            <span style="color: white; font-weight: bold; font-size: 1rem;">Mi ubicación</span>
          </div>
        `

    let currentUser = popupCliente
    watch(stateUser, async (newValue, oldValue) => {
      if (newValue === 'authenticated') {
        currentUser = popupUser
      } else {
        currentUser = popupCliente
      }
    })

    const initMap = async () => {
      if (stateUser.value === 'authenticated') {
        currentUser = popupUser
      } else {
        currentUser = popupCliente
      }
      if (!mapElement.value) return
      if (!userLocation.value) return
      await Promise.resolve()
      const map = new mapboxgl.Map({
        container: mapElement.value,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: userLocation.value, // starting position [lng, lat]
        zoom: 15
      })
      const nav = new mapboxgl.NavigationControl({ showCompass: true, visualizePitch: true })

      const popup = new mapboxgl.Popup({ anchor: 'right' })
        .setLngLat(userLocation.value)
        .setHTML(currentUser)
        .setMaxWidth('300px')

      map.addControl(nav, 'bottom-left')

      //Agregar markador
      const myLocationMarker = new mapboxgl.Marker({ color: 'red', draggable: true })
        .setLngLat(userLocation.value)
        .setPopup(popup)
        .addTo(map)
        .togglePopup()

      // Redirigir en el popup a la pantalla de logueado
      // popup.on('open', () => {
      //   popup
      //     .getElement()
      //     .querySelector('.volverPlaces')
      /*     ?.addEventListener('click', () => {*/
      //       console.log('establece');
      //       setInitLocationRoom();
      //       goRoute('infoplace');
      //     })
      // })
      popup
        .getElement()
        .querySelector('.volverPlaces')
        ?.addEventListener('click', () => {
          console.log('establece')
          setInitLocationRoom()
          goRoute('infoplace')
        })

      setPositionMarker(myLocationMarker, setRoomLocation) // ubicación del cuarto cada vez que se arrastra el mark
      setMap(map) // almacenar en el store
    }

    onMounted(() => {
      if(primeraVezEntra.value === 0){
        if (isUserlocationReady.value) {
          setPrimeraVezEntra();  
          setTimeout(async() => {
            setPassTimeLogo(true);
            return initMap()
          }, 3000);

  
        }
      }
      else{
        if (isUserlocationReady.value) {
          setPassTimeLogo(true);
          return initMap()
        }
      }
    })

    watch(isUserlocationReady, async (newVal) => {
      setTimeout(() => {
        setPassTimeLogo(true);
        if (newVal) {
          return initMap()
        }
      }, 3000);
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
      passTimeLogo,
    }
  }
})
