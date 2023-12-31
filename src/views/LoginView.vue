<template>
  <div
    style="background-color: #1a5276; height: 100vh"
    class="d-flex p-2 bd-highlight justify-content-center align-items-center"
  >
    <div class="card" style="width: 300px">
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
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
            <button type="submit" class="btn btn-success">Submit</button>
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
    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const { startLogin } = useLogin()

    let isEmailValid = ref(true)
    let isPasswordValid = ref(true)

    const validarEmail = (email: string) => {
      const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return expresionRegular.test(email)
    }

    const validarPassword = (passwordVal: string) => {
      return passwordVal.length >= 8 ? true : false
    }

    return {
      email,
      password,
      isEmailValid,
      isPasswordValid,

      handleSubmit: async (event: Event) => {
        event.preventDefault()
        isEmailValid.value = validarEmail(email.value)
        isPasswordValid.value = validarPassword(password.value)
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
        if (isEmailValid.value && isPasswordValid) {
          const user_email = email.value
          const user_password = password.value
          const { ok } = await startLogin({ user_email, user_password })
          if (ok) return router.push({ name: 'infoplace' })
        } else {
          return
        }
      }
    }
  }
})
</script>
