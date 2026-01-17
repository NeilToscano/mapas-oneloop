<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-success">
      <div class="container-fluid">
        <a class="navbar-brand text-white fs-4" href="#">Aloja</a>
        <div>
          <div
            class="avatar-icon d-flex justify-content-center align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            aria-expanded="false"
            v-if="userInfo.name && userInfo"
          >
            {{ userInfo.name.charAt(0) }}
          </div>

          <div class="modal" tabindex="-1" id="exampleModal">
            <div
              class="modal-dialog"
              style="position: absolute; max-width: 350px; right: 40px; top: 30px"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    id="cerrar"
                    class="btn-close cerrar-modal"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="card">
                    <img
                      src="https://picsum.photos/300/150"
                      class="card-img-top"
                      alt="No se encontro imagen"
                      style="width: 300px; height: 150px"
                    />
                    <!-- todo Avatar -->
                    <div style="position: absolute; top: 30px; left: 30px" aria-expanded="false">
                      <div
                        style="background-color: green; color: white; font-size: 2.6rem"
                        class="avatar-icon-menu d-flex justify-content-center align-items-center"
                        v-if="userInfo.name && userInfo"
                      >
                        {{ userInfo.name.charAt(0) }}
                      </div>
                      <p style="font-size: 1.3rem">
                        <span class="badge" style="background-color: rgba(0, 0, 0, 0.4)">{{
                          userInfo.name
                        }}</span>
                        <br />
                        <span class="badge" style="background-color: rgba(0, 0, 0, 0.4)">{{
                          userInfo.email
                        }}</span>
                      </p>
                    </div>
                    <ul class="list-group list-group-flush list-routes" style="font-size: large">
                      <li class="list-group-item" style="margin-top: 0px">
                        <span class="bi bi-person-fill" style="margin-right: 5px"></span
                        ><span>Perfil </span>
                      </li>
                      <li
                        class="list-group-item"
                        style="margin-top: 0px"
                        @click="goRoute('infoplace')"
                      >
                        <span class="bi bi-journal-check" style="margin-right: 5px"></span
                        ><span>Publicar</span>
                      </li>
                      <li
                        class="list-group-item"
                        style="margin-top: 0px"
                        @click="goRoute('publicaciones')"
                      >
                        <span class="bi bi-card-checklist" style="margin-right: 5px"></span
                        ><span>Publicaciones</span>
                      </li>
                      <li class="list-group-item">
                        <span class="bi bi-gear-fill" style="margin-right: 5px"></span
                        ><span>Configuración </span>
                      </li>
                      <li class="list-group-item" @click="logout">
                        <span class="bi bi-box-arrow-right" style="margin-right: 5px"></span
                        ><span>Sign Out </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="scrollbar-container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { useLogin } from '@/composables/useAuth'
import router from '@/router'
import { defineComponent, onBeforeUnmount } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const { onLogout, userInfo } = useLogin()

    onBeforeUnmount(() => {
      const myModal = document.getElementById('cerrar')
      myModal?.click()
    })

    return {
      goRoute: (name: string) => {
        const myModal = document.getElementById('cerrar')
        myModal?.click()
        router.push({ name })
      },
      logout: () => {
        onLogout(undefined)
        router.push({ name: 'home' })
      },
      userInfo
    }
  }
})
</script>

<style scoped>
.avatar-icon {
  height: 35px;
  width: 35px;
  background-color: white;
  color: teal;
  border-radius: 50%;
  cursor: pointer;
  font-size: larger;
}
.avatar-icon-menu {
  height: 45px;
  width: 45px;
  background-color: white;
  color: teal;
  border-radius: 50%;
  cursor: pointer;
  font-size: larger;
}
.list-routes li:hover {
  background-color: rgb(74, 175, 182);
  cursor: pointer;
}
</style>
