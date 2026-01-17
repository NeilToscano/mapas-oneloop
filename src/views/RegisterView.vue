<template>
  <div
    style="background-color: #fdf9d3; height: 100vh"
    class="d-flex p-2 bd-highlight justify-content-center align-items-center"
  >
    <div class="card" style="width: 300px">
      <div
        class="text-white"
        style="
          border-radius: 5px;
          font-size: 2rem;
          text-align: center;
          background-color: rgb(23, 93, 96);
          color: white;
        "
      >
        Registrarse
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="form-group p-2">
            <label for="nombre">Nombre completo</label>
            <input
              type="text"
              class="form-control"
              id="nombre"
              placeholder="Nombre"
              v-model="nombre"
            />
            <span style="color: red; font-size: small" v-if="!isNombreValid">
              Nombre completo es obligatorio
            </span>
          </div>
          <div class="form-group p-2">
            <label for="exampleInputEmail1">Correo electrónico</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="email"
              v-model="email"
            />
            <span style="color: red; font-size: small" v-if="!isEmailValid">
              Poner email válido
            </span>
          </div>
          <div class="form-group p-2">
            <label for="InputPassword1">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="InputPassword1"
              placeholder="Password"
              v-model="password"
            />
            <span style="color: red; font-size: small" v-if="!isPasswordValid">
              La contraseña debe mayor que 8 caracteres
            </span>
          </div>
          <div class="form-group p-2">
            <div class="row">
              <div class="col">
                <button type="submit" class="btn" style="background-color: rgb(23,93,96); color: white;">
                  <div v-if="checkingRegister" class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <div v-else>Submit</div>
                </button>
              </div>

              <span v-if="registerError" style="color: red; font-size: small">
                Ocurrió un error(intenta con otro correo)
              </span>
              <br />
            </div>
            <div class="row text-end">
              <div class="col align-self-end">
                <router-link to="/login">Ya tengo cuenta</router-link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useLogin } from '@/composables/useAuth'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  setup() {
    const { startRegister } = useLogin()
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const nombre = ref('')

    let isEmailValid = ref(true)
    let isPasswordValid = ref(true)
    let isNombreValid = ref(true)

    const checkingRegister = ref(false)
    const registerError = ref(false)

    const validarEmail = (email: string) => {
      const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return expresionRegular.test(email)
    }

    const validarPassword = (passwordVal: string) => {
      return passwordVal.length >= 8 ? true : false
    }

    const validarNombre = (nombreVal: string) => {
      return nombreVal.length >= 3 ? true : false
    }

    return {
      email,
      password,
      nombre,
      isEmailValid,
      isPasswordValid,
      isNombreValid,
      checkingRegister,
      registerError,

      handleSubmit: async (event: Event) => {
        checkingRegister.value = true
        isEmailValid.value = validarEmail(email.value)
        isPasswordValid.value = validarPassword(password.value)
        isNombreValid.value = validarNombre(nombre.value)

        if (!isEmailValid.value) {
          setTimeout(() => {
            isEmailValid.value = true
          }, 3000)
        }
        if (!isPasswordValid.value) {
          setTimeout(() => {
            isPasswordValid.value = true
          }, 3000)
        }
        if (!isNombreValid.value) {
          setTimeout(() => {
            isNombreValid.value = true
          }, 3000)
        }
        if (isEmailValid.value && isPasswordValid.value && isNombreValid.value) {
          const user_email = email.value
          const user_password = password.value
          const user_name = nombre.value

          const { ok } = await startRegister({ user_email, user_password, user_name })
          checkingRegister.value = false
          if (ok) return router.push({ name: 'login' })
          else {
            registerError.value = true
            setTimeout(() => {
              registerError.value = false
            }, 3000)
          }
        } else {
          console.log('error')
          checkingRegister.value = false
          return
        }
      }
    }
  }
})
</script>
