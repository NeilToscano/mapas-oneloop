<script lang="ts" src="./SearchBar.ts"></script>
<template>
  <div class="searchbar-container" v-if="isSearchReady">
    <div
      ref="popoverButton"
      data-bs-toggle="popover"
      data-bs-custom-class="custom-popover" 
      data-bs-title="Poner la Dir. de la Universidad"
      data-bs-content="ejm: Universidad Nacional de Ingenieria"
      data-bs-placement="bottom"
    >
      <input
      class="form-control input-place"
      placeholder="Escribe el lugar..."
      type="text"
      v-model="searchTerm"
      @click="disablePopover"
      />
    </div>
    <SearchResults />
  </div>
  <!-- <div class="marca-de-agua">
    <div ref="popoverButton" type="button" class="btn btn-secondary" data-bs-toggle="popover" data-bs-content="Contenido del popover">
      Popover
    </div>
  </div> -->
</template>

<style scoped>
.searchbar-container {
  position: fixed;
  top: 5px;
  left: 20px;
  background-color: rgb(255, 255, 255);
  z-index: 999;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  width: 250px;
  border-radius: 10px;
  overflow: hidden;
  padding: 5px;
}
@media only screen and (max-width: 600px) {
  /* For mobile phones: */
  .searchbar-container {
    width: 60%;
    top: 40px;
  }
}
.marca-de-agua {
  height: 10vh;
  width: 20vw;
  border-radius: 20%;
  position: sticky;
  top: 5px;
  left: 5px;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
