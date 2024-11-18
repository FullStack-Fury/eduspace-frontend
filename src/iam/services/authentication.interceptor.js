import store from "../../store/index.js";
import http from "../../shared/services/http-common.js"; // Asegúrate de importar Vuex

    http.interceptors.request.use(
    (config) => {
        console.log("Interceptor: Recuperando token desde Vuex...");
        const token = store.getters["user/userToken"]; // Recuperar token dinámicamente

        if (token) {
            console.log("Interceptor: Token encontrado:", token);
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            console.warn("Interceptor: No se encontró un token.");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
