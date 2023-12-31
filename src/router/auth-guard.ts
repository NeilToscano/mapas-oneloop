import { useLoginStore } from '@/stores/auth.js'

const { initialState } = useLoginStore()

export const isAuthenticatedGuard = async (to: any, from: any, next: any) => {
  if (initialState.status !== 'Authenticated' && to.name !== 'login') {
    return { name: 'login' }
  }
}
