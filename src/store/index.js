import { createStore } from 'vuex';

export default createStore({
    state: {
        userId: null,
        userRole: null // El rol del usuario (1 = Admin, 2 = Teacher)
    },
    mutations: {
        setUser(state, userData) {
            state.userId = userData.id;
            state.userRole = userData.role;
        },
        clearUser(state) {
            state.userId = null;
            state.userRole = null;
        }
    },
    actions: {
        setUser({ commit }, userData) {
            localStorage.setItem('userRole', userData.role); // Guarda el rol en localStorage
            commit('setUser', userData);
        },
        clearUser({ commit }) {
            localStorage.removeItem('userRole'); // Elimina el rol de localStorage
            commit('clearUser');
        }
    },
    getters: {
        userId: (state) => state.userId,
        userRole: (state) => state.userRole
    }
});
