import { useLoginStore } from '../stores/auth'
import { cuartosApi } from '@/apis'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'

interface LoginParams {
  user_email: string
  user_password: string
}

export function useLogin() {
  const store = useLoginStore()
  const { onChecking, onLogin, onLogout, clearErrorMessage, initializeAuth } = store
  const { initialState, userInfo } = storeToRefs(store)

  const isErrorLogin = computed(() => initialState.value.errorMessage)
  const isAuth = computed(() => initialState.value.status)

  const startLogin = async ({ user_email, user_password }: LoginParams) => {
    onChecking()
    try {
      const { data } = await cuartosApi.post('/auth/login', {
        email: user_email,
        password: user_password
      })
      onLogin({
        name: data.usuario.nombre,
        uid: data.usuario.uid,
        email: data.usuario.email
      })
      console.log(data.token)
      localStorage.setItem('idToken', data.token)
      localStorage.setItem('token-init-date', JSON.stringify(new Date().getTime()))
      localStorage.setItem('refresh-token', data.refreshtoken)
      return { ok: true }
    } catch (error: any) {
      console.log(error, 'error')

      const errorResponse =
        error.response && error.response.data && error.response.data.msg
          ? error.response.data.msg
          : 'Error desconocido'
      onLogout(errorResponse)
      setTimeout(() => {
        clearErrorMessage()
      }, 10000)
      return { ok: false }
    }
  }
  const checkAuthStatus = async () => {
    const resp = await initializeAuth()
    console.log(resp)
    return resp
  }
  const startLogout = () => {
    onLogout(undefined)
  }

  return {
    startLogin,
    startLogout,
    isErrorLogin,
    isAuth,
    checkAuthStatus,
    onLogout,
    userInfo,
    initialState
  }
}
