<script lang="ts" src="./SearchResults.ts"></script>
<template>
  <div v-if="isLoadingPlaces" class="alert alert-primary text-center">
    <h5>Cargando</h5>
    <span>Espere por favor...</span>
  </div>

  <ul v-else-if="places.length > 0" class="list-group mt-3" style="height: 600px; overflow: auto">
    <li
      v-for="item in places"
      :key="item.id"
      class="list-group-item list-group-item-action"
      :class="item.id == activePlace ? 'active' : ''"
      @click="onPlaceClicked(item)"
    >
      <h5>{{ item.text }}</h5>
      <p>{{ item.place_name }}</p>
      <div align="right">
        <button class="btn btn-outline-primary">Direcciones</button>
      </div>
    </li>
  </ul>
</template>

<style scoped>
li {
  cursor: pointer;
}
</style>
