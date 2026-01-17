import { useRoom } from '@/composables'
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'CardAbsolute',

  setup() {
    const modalRef = ref(null)

    const { roomSelected, cardMap, toggleCardMap, roomsList } = useRoom()

    watch(cardMap, () => {
      console.log(cardMap.value, 'no se modifica')
    })
    window.onclick = function (event) {
      if (event.target == modalRef.value) {
        toggleCardMap()
      }
    }

    return {
      roomSelected,
      roomsList,
      modalRef,
      cardMap
    }
  }
})
