import UserService from "../services/UserService.js";

export const SIGNUP = 'user/signup';
export const LOGIN = 'user/login';
export const SET_USER = 'user/setUser';
export const SIGNOUT = 'user/signout';

export default {
    state: {
        loggedinUser: null
    },
    getters: {
        isUser(state) {
            return !!state.loggedinUser
        },
    },
    mutations: {
        [SET_USER](state, { user }) {
            state.loggedinUser = user;
        },
        [SIGNOUT](state) {
            state.loggedinUser = null;
        },
    },
    actions: {
        [SIGNUP]({ commit }, { signupDetails }) {
            UserService
                .signup(signupDetails)
                .then(res => {
                    commit({ type: SET_USER, user: res.user })
                })
                .catch(err => {
                    console.log(err)
                    throw err;
                });
        },
        [LOGIN]({ commit }, { loginDetails }) {
            UserService
                .login(loginDetails)
                .then(res => {
                    commit({ type: SET_USER, user: res.user });
                })
                .catch(err => {
                    console.log(err)
                    throw err;
                });
        },
        [SIGNOUT]({ commit }) {
            UserService
                .logout()
                .then(_ => {
                    commit({ type: SIGNOUT })
                })
        },
    }
}
