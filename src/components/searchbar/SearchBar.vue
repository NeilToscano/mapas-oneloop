<script lang="ts" src="./SearchBar.ts"></script>
<template>
  <div class="searchbar-container">
    <input
      class="form-control input-place"
      placeholder="Buscar lugares..."
      type="text"
      v-model="searchTerm"
    />
    <SearchResults />
  </div>
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
  .searchbar-container{
    width: 60%;
    top: 40px;
  }
}
</style>
