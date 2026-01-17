<template>
  <div class="d-flex justify-content-around flex-wrap p-2">
    <div
      v-if="deleteItem"
      class="alert alert-danger"
      role="alert"
      style="position: absolute; width: 250px; z-index: 1; bottom: 5px"
    >
      Se borró correctamente
    </div>
    <div class="card m-1" style="max-width: 18rem" v-for="item in habitaciones" :key="item.uid">
      <div class="card-body">
        <h5 class="card-title">Distrito: {{ item.distrito }}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">Avenida: {{ item.avenida }}</h6>
        <p class="card-text">Descripción: {{ item.descripcion }}</p>

        <button type="button" class="btn btn-danger" @click="deleteCard(item.uid)">Eliminar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useForm } from '@/composables'
import { useLogin } from '@/composables/useAuth'
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  setup() {
    const { getPostsUser, deletePostUser } = useForm()
    const { userInfo } = useLogin()
    let habitaciones = ref<any[]>([])
    const deleteItem = ref(false)
    const deletemsg = ref('')

    const recargarItems = async () => {
      const { ok, msg } = await getPostsUser(userInfo.value.uid)
      if (ok) {
        habitaciones.value = msg
      }
    }
    onMounted(async () => {
      recargarItems()
    })

    const deleteCard = async (id: string) => {
      const { ok, msg } = await deletePostUser(id)
      if (ok) {
        deleteItem.value = true
        deletemsg.value = 'se borró corréctamente'
      } else {
        deleteItem.value = true
        deletemsg.value = 'Ocurrió un error'
      }
      recargarItems()
      setTimeout(() => {
        deleteItem.value = false
        deletemsg.value = ''
      }, 3000)
    }
    return {
      habitaciones,
      deleteCard,
      deleteItem
    }
  }
})
</script>
