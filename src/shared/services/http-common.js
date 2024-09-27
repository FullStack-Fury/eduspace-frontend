import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log("API_BASE_URL:", API_BASE_URL);

const http = axios.create({
    baseURL: API_BASE_URL
});

http.defaults.headers.common['Content-Type'] = 'application/json';

export default http;