<script lang="ts" src="./MapView.ts"></script>
<template>
  <div
    v-if="!isUserlocationReady"
    class="loading d-flex justify-content-center align-items-center"
    style="
      background-image: url('https://images.pexels.com/photos/3935340/pexels-photo-3935340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
      background-size: 100% 100%;
    "
  >
    <div
      style="width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5)"
      class="d-flex flex-column justify-content-center align-items-center"
    >
      <div class="d-flex flex-column justify-content-center align-items-center text-center">
        <div class="avatar-icon d-flex justify-content-center align-items-center">
          <p style="font-family: cursive">Aloja</p>
        </div>
        <p style="font-size: 1.2rem; font-family: cursive; color: rgb(255, 255, 255)">
          Encuentra cuartos disponibles para alquiler
        </p>
        <span style="color: rgb(192, 199, 199)">Localizando...</span>
      </div>
    </div>
  </div>
  <!-- ! pantalla que dura 2 segundos, cuando ya tenemos UserLocation -->
  <div
    v-if="isUserlocationReady && !passTimeLogo" 
    class="loading d-flex justify-content-center align-items-center"
    style="
      background-image: url('https://images.pexels.com/photos/3935340/pexels-photo-3935340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
      background-size: 100% 100%;
    "
  >
    <div
      style="width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5)"
      class="d-flex flex-column justify-content-center align-items-center"
    >
      <div class="d-flex flex-column justify-content-center align-items-center text-center">
        <div class="logo-avatar d-flex justify-content-center align-items-center">
          <img src="https://res.cloudinary.com/dvult5ws1/image/upload/v1707413161/logo2_faog4h.png" alt="Cargando">
        </div>
        <p style="font-size: 1.2rem; font-family: cursive; color: rgb(255, 255, 255)">
          Encuentra cuartos disponibles para alquiler
        </p>
        <span style="color: rgb(192, 199, 199)">Localizando...</span>
      </div>
    </div>
  </div>

  <div v-show="isUserlocationReady && passTimeLogo" class="map-container" ref="mapElement"></div>
</template>

<style scoped lang="css">
.map-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgb(158, 157, 157);
}
.loading {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background-color: rgb(26, 188, 156, 0.9);
  color: white;
}
.avatar-icon {
  height: 200px;
  width: 200px;
  background-color: white;
  color: teal;
  border-radius: 50%;
  cursor: pointer;
  font-size: 5rem;
  border-top: 4px solid #3498db;
  animation: spin 7s linear infinite;
}

.logo-avatar img{
  width: 20vw;
  border-radius: 50%;
}
@media screen and (max-width:800px) {
  .logo-avatar img{
    width: 50vw;
    border-radius: 50%;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg); /* Gira completamente alrededor */
  }
}
</style>
