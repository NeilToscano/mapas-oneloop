import { defineComponent, ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import SearchResults from '@/components/searchresults/SearchResults.vue'
import { useMapsStore, usePlacesStore } from '@/composables'
import { Popover } from 'bootstrap';
export default defineComponent({
  name: 'SearchBar',
  components: {
    SearchResults
  },
  setup() {
    const debounceTimeout = ref()
    const debounceValue = ref('asd')
    const popoverButton = ref(null);
    const { searchPlacesByTerm, isUserlocationReady, passTimeLogo } = usePlacesStore()
    const { isMapReady } = useMapsStore()
    let popover:any;

    const isSearchReady = computed(() => {
      return passTimeLogo.value && isUserlocationReady.value && isUserlocationReady.value ? true : false;
    })
    onBeforeUnmount(() => {
      popover.hide();
      popover.disable();
    })

    watch(isSearchReady, async (newvalue, oldvalue) => {
      if (newvalue) {
        setTimeout(() => {
          if(popoverButton.value !== null) {
            popover = new Popover(popoverButton.value);
          }
          popover.show();
          
        }, 10);
      }
    });

    function disablePopover() {
      popover.hide();
      popover.disable();
    }

    return {
      debounceValue,
      popoverButton,
      disablePopover,
      searchTerm: computed({
        get() {
          return debounceValue.value
        },
        set(val: string) {
          if (debounceTimeout.value) clearTimeout(debounceTimeout.value)

          debounceTimeout.value = setTimeout(() => {
            debounceValue.value = val
            searchPlacesByTerm(debounceValue.value)
          }, 2000)
        }
      }),
      // isSearchReady: computed(() => isUserlocationReady.value && isMapReady),
      passTimeLogo,
      isSearchReady,

    }
  }
})
