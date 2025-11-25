import axios from "axios"
const instance = axios.create({
    withCredentials:true,
    baseURL:"https://react-ecommerce-ajb4.onrender.com/api/"
})

export default instance;