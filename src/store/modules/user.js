export default {
    namespaced: true,
    state: {
        id: null,
        role: null,
        token: null
    },
    mutations: {
        SET_USER_ID(state, id) {
            state.id = id;
        },
        SET_USER_ROLE(state, role) {
            state.role = role;
        },
        SET_USER_TOKEN(state, token) {
            state.token = token;
        },
        CLEAR_USER(state) {
            state.id = null;
            state.role = null;
            state.token = null;
        }
    },
    actions: {
        setUser({ commit }, { id, role, token }) {
            commit('SET_USER_ID', id);
            commit('SET_USER_ROLE', role);
            commit('SET_USER_TOKEN', token);
        },
        clearUser({ commit }) {
            commit('CLEAR_USER')
        }
    },
    getters: {
        userId: (state) => state.id,
        userRole: (state) => state.role,
        userToken: (state) => state.token
    },
}