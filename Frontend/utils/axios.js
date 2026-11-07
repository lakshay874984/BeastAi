import axios from "axios";

const api=axios.create({
    baseURL:import.meta.env.VITE_SERVER_URL,
    withCredentials:true
    a:3
})

export default api

