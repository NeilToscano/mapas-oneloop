<script lang="ts" src="./CardAbsolute.ts"></script>

<template>
  <div
    id="myModal"
    class="modal"
    ref="modalRef"
    :style="cardMap ? { display: 'block' } : { display: 'none' }"
  >
    <div class="modal-content" style="width: 300px">
      <div v-if="roomSelected !== null" class="card">
        <div id="carouselExample" class="carousel slide">
          <div class="carousel-inner">
            <div
              v-for="(urlimg, index) in roomSelected.roomUrl"
              :key="index"
              class="carousel-item active"
            >
              <img :src="urlimg" style="width: 100%; height: 160px" alt="not found" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              class="carousel-control-prev-icon"
              aria-hidden="true"
              style="background-color: rgb(70, 68, 68)"
            ></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              class="carousel-control-next-icon"
              aria-hidden="true"
              style="background-color: rgb(70, 68, 68)"
            ></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <!-- <img :src="roomSelected !== null? roomSelected.roomUrl[0]: ''" class="card-img-top" alt="no se encuentra"> -->
        <div class="card-body" style="padding-left: 0%">
          <ul>
            <li>
              <p class="body-text">
                <span style="font-weight: bold">Precio:</span>S/ {{ roomSelected.precio }}
              </p>
            </li>
            <li>
              <p class="body-text">
                <span style="font-weight: bold">Ubicación:</span> {{ roomSelected.avenida }}
              </p>
            </li>
            <li>
              <p class="body-text">
                <span style="font-weight: bold">Distrito:</span>{{ roomSelected.distrito }}
              </p>
            </li>
            <li>
              <p class="body-text">
                <span style="font-weight: bold">Referencia:</span>{{ roomSelected.descripcion }}
              </p>
            </li>
            <li>
              <p class="body-text">
                <span style="font-weight: bold">Dimensión:</span> {{ roomSelected.tamroom }}m&sup2;
              </p>
            </li>
          </ul>
          <span class="badge text-bg-success mx-1"
            ><i class="fa-solid fa-toilet"></i> {{ roomSelected.numbanio }}</span
          >
          <span class="badge text-bg-success mx-1"
            ><i class="fa-solid fa-bed"></i> {{ roomSelected.numdormitorio }} dorm.</span
          >
          <div style="display: flex; font-size: 1.2rem; margin-top: 5px">
            <div>
              <i class="fa-solid fa-phone" style="color: green"></i> {{ roomSelected.numtelefono }}
            </div>
            <div style="margin-left: auto; cursor: pointer; color: green; font-size: 1.5rem">
              <a
                :href="
                  'https://wa.me/' +
                  roomSelected.numtelefono +
                  '?text=¡Hola! soy Cliente de OneLoop.'
                "
                target="_blank"
                ><i class="fa-brands fa-whatsapp"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
}

.body-text {
  margin-top: 1px;
  margin-bottom: 1px;
  letter-spacing: 2px;
  font-size: small;
}
</style>
