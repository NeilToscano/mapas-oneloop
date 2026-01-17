<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLogin } from './composables/useAuth'
import { usePlacesStore } from './composables'

const { checkAuthStatus } = useLogin()
usePlacesStore()
checkAuthStatus()
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
