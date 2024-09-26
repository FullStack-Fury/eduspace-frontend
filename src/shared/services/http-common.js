import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API_BASE_URL:", API_BASE_URL); // Verifica que esto imprima la URL correcta

const http = axios.create({
    baseURL: API_BASE_URL // Asegúrate de que esta variable esté definida
});

http.defaults.headers.common['Content-Type'] = 'application/json';

export default http;
