import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/docs.css';
import App from './App.vue'
import router from './router'
import mapboxgl from 'mapbox-gl' // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  'pk.eyJ1IjoibmVpZGNhbiIsImEiOiJjbDRuM2gyajUwMmU4M3BubjgwZHJraDZ1In0.c-ABvSr3FBMsrgg3rl7HHw'
if (!navigator.geolocation) {
  alert('Tu navegador no soporta Geolocation')
  throw new Error('Tu navegador no soporta Geolocation')
}
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
