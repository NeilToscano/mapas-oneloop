<script setup lang="ts">
import { RouterView } from 'vue-router'
import { usePlaceStore } from '@/stores/places'
import { useLogin } from './composables/useAuth'

const { checkAuthStatus, isAuth } = useLogin()

checkAuthStatus()
</script>

<template>
  <div>
    <div v-if="isAuth === 'checking'">Cargando</div>
    <RouterView v-else />
  </div>
</template>

<style scoped></style>
