export default {
    namespaced: true,
    state: {
        id: null,
        role: null,
        token: localStorage.getItem('token') || null, // Inicializa el token desde localStorage
    },
    mutations: {
        SET_USER_ID(state, id) {
            console.log("Set user ID:", id); // Log para verificar ID
            state.id = id;
        },
        SET_USER_ROLE(state, role) {
            console.log("Set user role:", role); // Log para verificar role
            state.role = role;
        },
        SET_USER_TOKEN(state, token) {
            console.log("Set user token:", token); // Log para verificar token
            state.token = token;
        },
        CLEAR_USER(state) {
            console.log("Clearing user data"); // Log para depuración
            state.id = null;
            state.role = null;
            state.token = null;
        },
    },
    actions: {
        setUser({ commit }, { id, role, token }) {
            console.log("Action setUser called with:", { id, role, token }); // Log para verificar los datos
            commit("SET_USER_ID", id);
            commit("SET_USER_ROLE", role);
            commit("SET_USER_TOKEN", token);

            // Guardar el token en localStorage para persistencia
            localStorage.setItem("token", token);
        },
        clearUser({ commit }) {
            console.log("Action clearUser called"); // Log para verificar cuando se limpia el usuario
            commit("CLEAR_USER");

            // Eliminar el token de localStorage al cerrar sesión
            localStorage.removeItem("token");
        },
    },
    getters: {
        userId: (state) => {
            console.log("Getter userId:", state.id); // Log para verificar el getter
            return state.id;
        },
        userRole: (state) => {
            console.log("Getter userRole:", state.role); // Log para verificar el getter
            return state.role;
        },
        userToken: (state) => {
            console.log("Getter userToken:", state.token); // Log para verificar el getter
            return state.token;
        },
    },
};
