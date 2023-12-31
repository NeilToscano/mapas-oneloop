<template>
  <MapView />
  <SearchBar />
  <MyLocationBtn />
  <CardAbsolute />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MapView from '@/components/mapview/MapView.vue'
import MyLocationBtn from '@/components/my-location-btn/MyLocationBtn.vue'
import SearchBar from '@/components/searchbar/SearchBar.vue'
import CardAbsolute from '@/components/cardabsolute/CardAbsolute.vue'
import { usePlacesStore } from '@/composables/usePlacesStore'
import { useMapsStore } from '@/composables/useMapStore'

export default defineComponent({
  components: {
    MapView,
    MyLocationBtn,
    SearchBar,
    CardAbsolute
  },
  setup() {
    usePlacesStore()
    useMapsStore()
    return {}
  }
})
</script>
@/components/cardabsolute/CardAbsolute.vue