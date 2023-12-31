import { defineComponent, ref } from 'vue'
import { useMapsStore } from '@/composables';

export default defineComponent({
  name: 'CardAbsolute',

  setup() {
    const { roomSelected, cardMap, toggleCardMap } = useMapsStore();
    const modalRef = ref(null);
    window.onclick = function (event) {
      console.log("hello");
      if (event.target == modalRef.value) {
        toggleCardMap()
      }
    }

    return {
        roomSelected,
        modalRef,
        cardMap,

    }
  }
})
