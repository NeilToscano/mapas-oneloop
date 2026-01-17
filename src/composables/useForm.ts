import { cuartosApi } from '@/apis'

export const useForm = () => {
  const getPostsUser = async (id: string) => {
    const idToken = localStorage.getItem('idToken')
    try {
      const { data } = await cuartosApi.get('/form/posts', {
        params: {
          access_token: idToken,
          id
        }
      })
      return {
        ok: true,
        msg: data.msg
      }
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        msg: 'Ocurrió un error'
      }
    }
  }

  const deletePostUser = async (id: string) => {
    const idToken = localStorage.getItem('idToken')
    try {
      const { data } = await cuartosApi.delete('/form/posts', {
        params: {
          access_token: idToken,
          id
        }
      })
      return {
        ok: true,
        msg: 'se borró correctamente'
      }
    } catch (error) {
      console.log(error)
      return {
        ok: false,
        msg: 'Ocurrió un error al borrar'
      }
    }
  }

  return {
    getPostsUser,
    deletePostUser
  }
}
