import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCardRoom = defineStore('cardroom', () => {
  const cardMap = ref<boolean>(false)
  const roomsList = ref(null)
  const roomSelected = ref<any>(null)

  function toggleCardMap() {
    cardMap.value = !cardMap.value
  }

  return {
    cardMap,
    roomsList,
    roomSelected,
    toggleCardMap
  }
})
