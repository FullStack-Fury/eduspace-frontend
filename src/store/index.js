import { createStore } from 'vuex';

export default createStore({
    state: {
        userId: null,
        userRole: null, // El rol del usuario (1 = Admin, 2 = Teacher)
        userName: null, // Agregar el nombre del usuario
    },
    mutations: {
        setUser(state, userData) {
            state.userId = userData.id;
            state.userRole = userData.role;
            state.userName = userData.name; // Asegúrate de que `name` se guarda en `userName`
        },
        clearUser(state) {
            state.userId = null;
            state.userRole = null;
            state.userName = null;
        }
    },
    actions: {
        setUser({ commit }, userData) {
            localStorage.setItem('userRole', userData.role); // Guarda el rol en localStorage si es necesario
            commit('setUser', userData);
        },
        clearUser({ commit }) {
            localStorage.removeItem('userRole'); // Elimina el rol de localStorage si es necesario
            commit('clearUser');
        }
    },
    getters: {
        userId: (state) => state.userId,
        userRole: (state) => state.userRole,
        userName: (state) => state.userName // Getter para obtener el nombre del usuario
    }
});
