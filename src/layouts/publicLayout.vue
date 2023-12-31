<template>
  <div style="background-color: transparent; position: fixed; z-index: 1000; right: 20px; top: 5px">
    <div class="dropdown-center">
      <button
        type="button"
        class="btn btn-warning dropdown-toggle"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Acceder
      </button>
      <ul class="dropdown-menu" style="background-color: #f7dc6f">
        <li
          style="border-bottom: 1px solid rgb(139, 131, 131); color: black; font-size: large"
          class="dropdown-item my-0 dropdown-color"
          @click="goRoute('login')"
        >
          Login
        </li>
        <li
          class="dropdown-item my-0 dropdown-color"
          style="font-size: large; color: black"
          @click="goRoute('registrarse')"
        >
          Registrarse
        </li>
      </ul>
    </div>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const router = useRouter()

    return {
      goRoute: (nameRoute: string) => {
        router.push({ name: nameRoute })
      }
    }
  }
})
</script>

<style scoped lang="css">
.dropdown-color:hover {
  cursor: pointer;
  background-color: #f9e79f;
}
</style>
