import axios from 'axios'

export const BASE_URL = 'https://four-parks-production.up.railway.app/api/v1'

const instance = axios.create({
    baseURL: "https://four-parks-production.up.railway.app/api/v1",
    withCredentials: true
})

export default instance
