import axios from "axios";

const api = axios.create({
 /*   baseURL: "http://localhost:5000"  */
 baseURL: "https://projeto-sispar-back.onrender.com" 
});

export default api;
