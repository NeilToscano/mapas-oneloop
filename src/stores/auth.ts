import { cuartosApi } from '@/apis'
import { defineStore } from 'pinia'

import { computed, ref } from 'vue'
interface State {
  status: string
  user: any
  errorMessage: string | undefined
}
export const useLoginStore = defineStore('login', () => {
  const initialState = ref<State>({
    status: 'checking',
    user: {},
    errorMessage: undefined
  })

  const userInfo = computed(() => initialState.value.user)
  const getErrorLogin = computed(() => initialState.value.errorMessage)
  const stateUser = computed(() => initialState.value.status)

  function onChecking() {
    initialState.value.status = 'checking'
    initialState.value.user = {}
    initialState.value.errorMessage = undefined
  }

  function onLogin(payload: {}) {
    initialState.value.status = 'authenticated'
    initialState.value.user = payload
    initialState.value.errorMessage = undefined
  }

  function onLogout(payload: string | undefined) {
    console.log('entra-logout')
    initialState.value.status = 'not-authenticated'
    initialState.value.user = {}
    initialState.value.errorMessage = payload
    localStorage.removeItem('idToken')
    localStorage.removeItem('refresh-token')
  }

  function clearErrorMessage() {
    initialState.value.errorMessage = undefined
  }

  async function initializeAuth() {
    const token = localStorage.getItem('idToken')

    if (!token) {
      onLogout(undefined)
      return { ok: false }
    }
    try {
      const { data } = await cuartosApi.post('/lookup', null, { params: { access_token: token } })
      const { nombre, email, uid } = data.usuario
      onLogin({ name: nombre, uid: uid, email: email })
      return { ok: true }
    } catch (error) {
      console.log(error, 'error')
      onLogout(undefined)
      return { ok: false, message: 'error' }
    }
  }

  return {
    onChecking,
    onLogin,
    onLogout,
    clearErrorMessage,
    initialState,
    getErrorLogin,
    initializeAuth,
    userInfo,
    stateUser
  }
})
