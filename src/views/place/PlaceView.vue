<template>
  <div
    style="background-color: #f4f5f7; min-height: 100vh"
    class="d-flex p-2 bd-highlight justify-content-center align-items-center"
  >
    <div class="card" style="width: 400px">
      <div class="card-body">
        <div class="fs-5">Escoger ubicación en la Mapa</div>
        <button type="button" class="btn btn-info" @click="goRoute('home')">ubicación</button>

        <span
          class="badge text-bg-success"
          style="display: inline-block; word-wrap: break-word; white-space: normal"
        >
          ubicación: {{ roomLocation }}
        </span>
        <form @submit.prevent="handleSubmit">
          <div class="form-group p-2">
            <label for="exampleInputEmail1">Distrito</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Rimac, Lima"
              v-model="distrito"
            />
          </div>

          <div class="form-group p-2">
            <label for="exampleInputPassword1">Avenida,jr...</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Av. Honorio Delgado 1536"
              v-model="avenida"
            />
          </div>

          <div class="form-group p-2">
            <label for="exampleInputPassword1">Precio.</label>
            <input
              type="number"
              class="form-control"
              id="precio"
              placeholder="280"
              v-model="precio"
            />
          </div>

          <div class="form-group p-2">
            <div class="row">
              <div class="col">
                <label for="exampleInputPassword1">Tamaño</label>
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="15"
                  v-model="tamroom"
                />
              </div>
              <div class="col">
                <label for="exampleInputPassword1">Baño</label>
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="1"
                  v-model="numbanio"
                />
              </div>
              <div class="col">
                <label for="exampleInputPassword1">Dormitorios</label>
                <input
                  type="number"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="1"
                  v-model="numdormitorio"
                />
              </div>
            </div>
          </div>

          <div class="form-group p-2">
            <label for="exampleInputPassword1">Teléfono</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="946684130"
              v-model="numtelefono"
            />
          </div>

          <div class="form-group p-2">
            <label for="exampleInputPassword1">Descripción</label>
            <textarea
              class="form-control"
              name="example"
              id=""
              cols="30"
              rows="3"
              placeholder="Estamos ubicado al lado de un parque, además contamos con internet"
              v-model="descripcion"
            ></textarea>
          </div>

          <div class="form-group p-2">
            <label for="myfile">Selecciona las fotos:</label>
            <input type="file" id="myfile" name="myfile" multiple="true" ref="fileOneLoop" />
          </div>
          <div id="thumbnails"></div>
          <div class="form-group p-2">
            <button type="submit" class="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { usePlacesStore } from '@/composables'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const fileOneLoop = ref<HTMLInputElement | null>(null)
    const router = useRouter()
    const { roomLocation, sendFormInfo } = usePlacesStore()

    const tamroom = ref(null)
    const numbanio = ref(null)
    const distrito = ref(null)
    const avenida = ref(null)
    const precio = ref(null)
    const descripcion = ref('')
    const numtelefono = ref(null)
    const numdormitorio = ref(null)

    onMounted(() => {
      const fileInput = fileOneLoop.value
      if (fileInput) {
        fileInput.addEventListener('change', handleFiles)
      }
    })

    //   const numFiles = files.length;
    const handleFiles = () => {
      const thumbnailsContainer = document.getElementById('thumbnails')
      const formdata = new FormData()
      if (fileOneLoop.value?.files) {
        for (let i = 0; i < fileOneLoop.value.files.length; i++) {
          const file = fileOneLoop.value.files[i]
          const imageType = /image.*/
          if (!file.type.match(imageType)) {
            continue
          }
          formdata.append(file.name.split('.')[0], file)
          const reader = new FileReader()
          reader.onload = (event) => {
            const thumbnail: HTMLImageElement = document.createElement('img')
            if (typeof event.target?.result === 'string') {
              thumbnail.src = event.target?.result
              thumbnail.style.width = '100px'
              thumbnail.style.height = 'auto'

              thumbnailsContainer?.appendChild(thumbnail)
            }
          }
          reader.readAsDataURL(file)
        }

        const cantidad = fileOneLoop.value?.files[0]

        return formdata
      }

      return
    }
    return {
      fileOneLoop,
      handleFiles,

      roomLocation,
      tamroom,
      numbanio,
      distrito,
      avenida,
      precio,
      descripcion,
      numtelefono,
      numdormitorio,

      goRoute: (routeVal: string) => {
        router.push({ name: routeVal })
      },

      handleSubmit: (event: Event) => {
        event.preventDefault()
        const formdata = handleFiles()
        if (
          !numdormitorio.value ||
          !descripcion.value ||
          !numtelefono.value ||
          !numbanio.value ||
          !avenida.value ||
          !distrito.value ||
          !precio.value ||
          !roomLocation.value ||
          !tamroom.value
        ) {
          console.log('debe completar los campos')
          return
        }
        formdata?.append('email', 'neil@gmail.com')
        formdata?.append('avenida', avenida.value)
        formdata?.append('distrito', distrito.value)
        formdata?.append('precio', precio.value)
        formdata?.append('roomLoc', JSON.stringify(roomLocation.value))
        formdata?.append('tamroom', tamroom.value)
        formdata?.append('numbanio', numbanio.value)
        formdata?.append('descripcion', descripcion.value)
        formdata?.append('numtelefono', numtelefono.value)
        formdata?.append('numdormitorio', numdormitorio.value)

        if (!formdata) {
          return
        }
        sendFormInfo(formdata)
      }
    }
  }
})
</script>

<style scoped>
div label {
  font-weight: bold;
}
</style>
