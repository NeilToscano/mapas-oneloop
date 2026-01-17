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
          style="
            display: inline-block;
            word-wrap: break-word;
            white-space: normal;
            margin-left: 2px;
          "
        >
          lng y lat: {{ roomLocation }}
        </span>
        <br />
        <span v-if="roomLocation === null ? true : false" style="color: rgb(241, 103, 103)">
          Escoja la ubicación</span
        >
        <form @submit.prevent="handleSubmit" class="needs-validation" ref="formValidation" validate>
          <div class="form-group p-2">
            <label for="distritoInput">Distrito</label>
            <input
              type="text"
              class="form-control"
              id="distritoInput"
              placeholder="Rimac, Lima"
              v-model="distrito"
              required
              style="font-weight: 500; color: black"
            />
            <div class="invalid-feedback">Introduzca el Distrito</div>
          </div>

          <div class="form-group p-2">
            <label for="avenidaInput">Avenida,jr, número</label>
            <input
              type="text"
              class="form-control"
              id="avenidaInput"
              placeholder="Av. Honorio Delgado N° 1536"
              v-model="avenida"
              required
              style="font-weight: 500; color: black"
            />
            <div class="invalid-feedback">Introduzca la avenida</div>
          </div>

          <div class="form-group p-2">
            <label for="precioInput">Precio.</label>
            <input
              type="number"
              class="form-control"
              id="precioInput"
              placeholder="280"
              v-model="precio"
              required
              style="font-weight: 500; color: black"
            />
            <div class="invalid-feedback">Introduzca el Precio</div>
          </div>

          <div class="form-group p-2">
            <div class="row">
              <div class="col">
                <label for="tamInput">Tamaño</label>
                <input
                  type="number"
                  class="form-control"
                  id="tamInput"
                  placeholder="15"
                  v-model="tamroom"
                  required
                  style="font-weight: 500; color: black"
                />
                <div class="invalid-feedback">Introduzca tamaño de la habitación</div>
              </div>
              <div class="col">
                <label for="banInput">Baño</label>
                <input
                  type="number"
                  class="form-control"
                  id="banInput"
                  placeholder="1"
                  v-model="numbanio"
                  required
                  style="font-weight: 500; color: black"
                />
                <div class="invalid-feedback">introduzca n° de baños</div>
              </div>
              <div class="col">
                <label for="numdormInput">Dormitorios</label>
                <input
                  type="number"
                  class="form-control"
                  id="numdormInput"
                  placeholder="1"
                  v-model="numdormitorio"
                  required
                  style="font-weight: 500; color: black"
                />
                <div class="invalid-feedback">Introduzca n° de dormintorio</div>
              </div>
            </div>
          </div>

          <div class="form-group p-2">
            <label for="numtelInput">Teléfono</label>
            <input
              type="text"
              class="form-control"
              id="numtelInput"
              placeholder="941234112"
              v-model="numtelefono"
              required
              style="font-weight: 500; color: black"
            />
            <div class="invalid-feedback">Introduzca n° de teléfono</div>
          </div>

          <div class="form-group p-2">
            <label for="descInput">Descripción/Referencia</label>
            <textarea
              class="form-control"
              name="example"
              id="descInput"
              cols="30"
              rows="3"
              placeholder="Estamos ubicado al lado de un parque, además contamos con internet"
              v-model="descripcion"
              required
              style="font-weight: 500; color: black"
            ></textarea>
            <div class="invalid-feedback">Introduzca descripción</div>
          </div>

          <div class="form-group p-2">
            <label for="myfile">Selecciona las fotos:</label>
            <input
              type="file"
              id="myfile"
              name="myfile"
              multiple="true"
              ref="fileOneLoop"
              required
              style="font-weight: 500; color: black"
            />
            <div class="invalid-feedback">suba por lo menos una imagen</div>
          </div>
          <div id="thumbnails"></div>

          <div class="form-group p-2">
            <button type="submit" class="btn btn-success" ref="formSubmit">
              <div v-if="enviado === 'checking'" class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Enviando...</span>
              </div>
              <div v-else>Submit</div>
            </button>
            <span
              class="badge bg-danger m-1"
              v-if="enviado === 'no-enviado' ? true : false"
              style="color: white; font-size: small"
            >
              Error al enviar
            </span>
            <span
              class="badge bg-info m-1"
              v-else-if="enviado === 'enviado' ? true : false"
              style="color: white; font-size: small; font-size: 1rem"
            >
              Enviado correctamente!
            </span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { usePlacesStore } from '@/composables'
import { useLogin } from '@/composables/useAuth'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const fileOneLoop = ref<HTMLInputElement | null>(null)
    const router = useRouter()
    const { roomLocation, sendFormInfo } = usePlacesStore()
    const { userInfo } = useLogin()

    const enviado = ref('inicio')

    const formValidation = ref<HTMLFormElement | null>(null)
    const formSubmit = ref()

    const tamroom = ref(null)
    const numbanio = ref(null)
    const distrito = ref(null)
    const avenida = ref(null)
    const precio = ref(null)
    const descripcion = ref('')
    const numtelefono = ref(null)
    const numdormitorio = ref(null)

    onMounted(() => {
      formSubmit.value.addEventListener(
        'click',
        (event: any) => {
          if (!formValidation.value) return
          if (!formValidation.value.checkValidity()) {
            formValidation.value.classList.add('was-validated')
            event.preventDefault()
            event.stopPropagation()
          }
        },
        false
      )
      const fileInput = fileOneLoop.value
      if (fileInput) {
        fileInput.addEventListener('change', handleFiles)
      }
    })

    //   const numFiles = files.length;
    const handleFiles = () => {
      const thumbnailsContainer = document.getElementById('thumbnails')
      if (!thumbnailsContainer) return
      thumbnailsContainer.innerHTML = ''
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
              ;(thumbnail.style.margin = '2px'), thumbnailsContainer?.appendChild(thumbnail)
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
      enviado,
      formValidation,
      formSubmit,
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

      handleSubmit: async (event: Event) => {
        console.log('hell9')
        event.preventDefault()

        const formdata = handleFiles()
        if (
          numdormitorio.value === null ||
          descripcion.value === null ||
          numtelefono.value === null ||
          numbanio.value === null ||
          avenida.value === null ||
          distrito.value === null ||
          precio.value === null ||
          roomLocation.value === null ||
          tamroom.value === null
        ) {
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
        formdata?.append('usuario', userInfo.value.uid)

        if (!formdata) {
          return
        }
        enviado.value = 'checking'
        const { ok, msg } = await sendFormInfo(formdata)
        if (ok) {
          enviado.value = 'enviado'
        } else {
          enviado.value = 'no-enviado'
        }
        setTimeout(() => {
          enviado.value = 'inicio'
        }, 6000)

        formValidation.value?.reset()
        tamroom.value = null
        numbanio.value = null
        distrito.value = null
        avenida.value = null
        precio.value = null
        descripcion.value = ''
        numtelefono.value = null
        numdormitorio.value = null
        const thumbnailsContainer = document.getElementById('thumbnails')
        if (!thumbnailsContainer) return
        thumbnailsContainer.innerHTML = ''
      }
    }
  }
})
</script>

<style scoped>
div label {
  font-weight: bold;
}
::placeholder {
  opacity: 0.4; /* Ajusta el valor según sea necesario (entre 0 y 1) */
}
</style>
