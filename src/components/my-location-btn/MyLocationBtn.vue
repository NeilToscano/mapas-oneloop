<template>
  <button class="btn text-white" style="background-color: #32969c" @click="onMyLocationClicked" v-if="isBtnReady && passTimeLogo">
    Ir a mi Ubicación
  </button>
</template>

<script lang="ts">
import { useMapsStore, usePlacesStore } from '@/composables'
import { defineComponent, computed, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'MyLocationBtn',

  setup() {
    const popoverButton = ref(null)
    const { map, isMapReady } = useMapsStore()
    const { userLocation, isUserlocationReady, passTimeLogo } = usePlacesStore()
    return {
      popoverButton,
      isBtnReady: computed(() => isUserlocationReady.value && isMapReady),
      onMyLocationClicked: () => {
        if (userLocation.value === null) return
        if (!map.value) return
        map.value.flyTo({
          center: userLocation.value,
          essential: true
        })
      },
      passTimeLogo
    }
  }
})
</script>

<style lang="css" scoped>
button {
  position: fixed;
  bottom: 30px;
  right: 30px;
}
</style>
