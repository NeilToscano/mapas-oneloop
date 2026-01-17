<template>
  <div
    style="background-color: transparent; position: fixed; z-index: 1000; right: 20px; top: 5px"
    ref="popoverNavbar"
    data-bs-toggle="popover"
    data-bs-placement="bottom"
    data-bs-content="Ingresar Login"
    v-if="isBtnBarReady"
    >
    <!-- v-if="isBtnLoginReady && passTimeLogo" -->
    <div class="dropdown-center">
      <button
        type="button"
        class="btn dropdown-toggle text-white"
        style="background-color: #32969c"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        @click="disablePopoverNavbar"
      >
        Acceder
      </button>
      <ul class="dropdown-menu" style="background-color: #32969c">
        <li
          class="dropdown-item my-0 dropdown-color text-white"
          @click="goRoute('login')"
          style="border-bottom: 1px solid rgb(233, 227, 227)"
        >
          Login
        </li>
        <li
          class="dropdown-item my-0 dropdown-color text-white"
          @click="goRoute('registrarse')"
          style="border-bottom: 1px solid rgb(224, 220, 220)"
        >
          Registrarse
        </li>
        <li
          class="dropdown-item my-0 dropdown-color text-white"
          @click="goRoute('home')"
          style="border-bottom: 1px solid rgb(224, 220, 220)"
        >
          Home
        </li>
        <li class="dropdown-item my-0 dropdown-color text-white" @click="goRoute('about')">
          Nosotros
        </li>
      </ul>
    </div>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { useMapsStore, usePlacesStore } from '@/composables'
import { defineComponent, computed, ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Popover } from 'bootstrap';


export default defineComponent({
  setup() {
    const router = useRouter()
    const popoverNavbar = ref(null)
    const { isMapReady } = useMapsStore()
    const { isUserlocationReady, setPassTimeLogo, passTimeLogo } = usePlacesStore()
    let popover:any;
    const isBtnBarReady = computed(() => {
      return isUserlocationReady.value && isMapReady.value && passTimeLogo.value ? true:false;
    })

    watch(isBtnBarReady, async (newvalue, oldvalue) => {
      if (newvalue) {
        setTimeout(() => {
          if(popoverNavbar.value !== null) {
            popover = new Popover(popoverNavbar.value);
          }
          popover.show();
          
        }, 10);
      }
    });
    function disablePopoverNavbar() {
      popover.hide();
      popover.disable();
    }

    return {
      popoverNavbar,
      goRoute: (nameRoute: string) => {
        router.push({ name: nameRoute })
      },
      // isBtnLoginReady: computed(() => isUserlocationReady.value && isMapReady),
      isBtnBarReady,
      passTimeLogo,
      disablePopoverNavbar
    }
  }
})
</script>

<style scoped lang="css">
.dropdown-color:hover {
  cursor: pointer;
  background-color: rgb(70, 142, 145);
}
.custom-popover {
  --bs-popover-max-width: 200px;
  --bs-popover-border-color: var(--bd-violet-bg);
  --bs-popover-header-bg: var(--bd-violet-bg);
  --bs-popover-header-color: var(--bs-white);
  --bs-popover-body-padding-x: 1rem;
  --bs-popover-body-padding-y: .5rem;
}
</style>
