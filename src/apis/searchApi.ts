import axios from 'axios'
const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    access_token:
      'pk.eyJ1IjoibmVpZGNhbiIsImEiOiJjbDRuM2gyajUwMmU4M3BubjgwZHJraDZ1In0.c-ABvSr3FBMsrgg3rl7HHw'
  }
})

export default searchApi
