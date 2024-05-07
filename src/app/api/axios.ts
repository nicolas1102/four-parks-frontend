import axios from 'axios'

export const BASE_URL = 'http://localhost:8080/api/v1'

const instance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true
})

export default instance
