import { createStore } from "vuex";
import {AuthenticationService} from "./authentication.service.js";


export default createStore({
    state: {
        user: null,
        token: null,
        isAuthenticated: false,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            state.isAuthenticated = !!user;
        },
        setToken(state, token) {
            state.token = token;
        },
        clearAuth(state) {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    actions: {
        async signIn({ commit }, payload) {
            const { token, user } = await AuthenticationService.signIn(payload);
            commit("setUser", user);
            commit("setToken", token);
        },
        async signUp(_, payload) {
            await AuthenticationService.signUp(payload);
        },
        signOut({ commit }) {
            commit("clearAuth");
        },
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        currentUser(state) {
            return state.user;
        },
    },
});
