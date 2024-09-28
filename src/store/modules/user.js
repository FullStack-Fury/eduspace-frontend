export default {
    namespaced: true,
    state: {
        id: null,
        role: null
    },
    mutations: {
        SET_USER_ID(state, id) {
            state.id = id;
        },
        SET_USER_ROLE(state, role) {
            state.role = role;
        },
        CLEAR_USER(state) {
            state.id = null;
            state.role = null;
        }
    },
    actions: {
        setUser({ commit }, { id, role }) {
            commit('SET_USER_ID', id);
            commit('SET_USER_ROLE', role);
        },
        clearUser({ commit }) {
            commit('CLEAR_USER')
        }
    },
    getters: {
        userId: (state) => state.id,
        userRole: (state) => state.role,
        isAuthenticated: (state) => !!state.id
    },
}