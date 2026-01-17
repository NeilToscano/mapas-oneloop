<template>
  <div class="d-flex justify-content-center align-items-center" style="background-color: #d0bfa7">
    <div class="card my-3" style="width: 95%">
      <img
        src="https://res.cloudinary.com/dvult5ws1/image/upload/v1705889440/about_main_plhwqd.png"
        class="card-img-top"
        alt="..."
      />
      <div class="card-body">
        <div class="mx-5 my-3">
          <h5 class="card-title my-3" style="color: blue">
            <span style="width: 1rem; height: 1rem" class="spinner-grow text-primary"></span>Sobre
            Nosotros
          </h5>
          <p class="card-text ms-4" style="font-size: 1.1rem; font-family: cursive">
            En Aloja, creemos que encontrar un espacio acogedor para quedarte debería ser tan fácil
            como un clic. Nuestra misión es simplificar el proceso de alquilar cuartos, conectando a
            viajeros con anfitriones amigables. Nos enorgullece ser la plataforma que hace que tu
            próxima estancia sea más que solo un lugar para descansar.
          </p>
          <h5 class="card-title my-3" style="color: rgb(221, 36, 98)">
            <span style="width: 1rem; height: 1rem" class="spinner-grow text-danger"></span>Nuestra
            Misión
          </h5>
          <p class="card-text ms-4" style="font-size: 1.1rem; font-family: cursive">
            En Aloja, nos dedicamos a fortalecer conexiones y enriquecer experiencias, creando un
            espacio donde las personas encuentren autenticidad y hospitalidad en su entorno. Nuestra
            misión es trascender los límites geográficos, centrarnos en la comunidad y construir
            puentes que conecten a individuos de todas partes.
          </p>
        </div>
        <div class="alert" role="alert" style="background-color: #352d18; color: white">
          <div class="row">
            <div
              class="col col-sm-4 d-flex justify-content-center align-items-center"
              style="font-weight: bolder"
            >
              <h3>Contáctanos</h3>
            </div>
            <div class="col">
              <p style="font-size: 1rem">
                Para cualquier consulta de la página web o alguna queja, comuníquese al siguiente
                correo: oneloopuni@gmail.com
              </p>
              <h5>Wsp: 946684130</h5>
              <!-- Botón agregado -->
              <button class="btn btn-primary mt-3" @click="contactar">Contáctanos ahora</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            class="col col-sm-4 d-flex justify-content-center align-items-center"
            style="font-weight: bolder"
          >
            <p>Copyright © 2024 Aloja Powered by OneLoop.</p>
          </div>
          <div class="col">
            <div class="d-flex justify-content-center">
              <i class="bi bi-whatsapp mx-1" style="color: rgb(207, 50, 77); font-size: 1.6rem"></i>
              <i
                class="bi bi-twitter-x mx-1"
                style="color: rgb(197, 43, 68); font-size: 1.6rem"
              ></i>
              <i class="bi bi-facebook mx-1" style="color: rgb(211, 50, 77); font-size: 1.6rem"></i>
              <i
                class="bi bi-envelope-at mx-1"
                style="color: rgb(194, 61, 83); font-size: 1.6rem"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async contactar() {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY3OWY3ODI4LTFlZGItNDM1MS1iMjYxLTM0YzZhODU2YzM0ZSIsImlhdCI6MTcyODY1Nzc4NCwiZXhwIjoxNzI4Njg2NTg0fQ.jtSY4PFHr1xsvy4arfdbdYn_z3HlK8eEYTkbvFoYUS4"; // Reemplaza esto con tu token real
      try {
        const response = await fetch("https://xynydxu4qi.us-east-2.awsapprunner.com/api/process-status/d7be4348-0fa6-430e-a6b7-116f75d006fe", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Añadir token Bearer en la cabecera
          },
        });

        const data = await response.json();  // Procesa la respuesta como JSON
        console.log(data)
        // alert("Mensaje enviado correctamente: " + data.message);
        console.log(data?.status || data.statusCode ===404)
      } catch (error) {
        console.log(error, 'error');
        // alert(error.message);
      }
    },
  },
};
</script>

<style></style>
