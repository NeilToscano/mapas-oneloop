<template>
  <button class="btn btn-primary" @click="onMyLocationClicked" v-if="isBtnReady">
    Ir a mi Ubicación
  </button>
</template>

<script lang="ts">
import { useMapsStore, usePlacesStore } from '@/composables'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'MyLocationBtn',

  setup() {
    const { isMapReady } = useMapsStore()
    const { map } = useMapsStore();
    const { userLocation, isUserlocationReady } = usePlacesStore()
    return {
      isBtnReady: computed(() => isUserlocationReady.value && isMapReady),
      onMyLocationClicked: () => {
        if(userLocation.value === null) return;
        if(!map.value) return;
        map.value.flyTo({
          center: userLocation.value,
          essential: true
        })
      }
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
