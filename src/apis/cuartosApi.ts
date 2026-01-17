import axios from 'axios'
const cuartosApi = axios.create({
  baseURL: 'https://cuartosoneloop.azurewebsites.net/api'
})

export default cuartosApi
