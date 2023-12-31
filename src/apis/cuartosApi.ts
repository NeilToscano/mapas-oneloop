import axios from 'axios'
const cuartosApi = axios.create({
  baseURL: 'http://localhost:8081/api'
})

export default cuartosApi
