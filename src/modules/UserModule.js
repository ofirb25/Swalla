import UserService from "../services/UserService.js";

export const SIGNUP = 'user/signup';
export const LOGIN = 'user/login';
export const SET_USER = 'user/setUser';
export const SIGNOUT = 'user/signout';

var STORAGE_KEY = 'loggedinUser';

export default {
    state: {    
        loggedinUser: getUserFromStorage()
    },
    getters: {
        isUser(state) {
            return !!state.loggedinUser
        },
        loggedinUserId(state) {
            if (state.loggedinUser) return state.loggedinUser._id
        },
        loggedinUserName(state) {
            if (state.loggedinUser) return state.loggedinUser.name
        }
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
                    saveToLocalStorage(res.user)

                })
                .catch(err => {
                    console.log(err)
                    throw err;
                });
        },
        [LOGIN]({ commit }, { loginDetails }) {
            return UserService
                .login(loginDetails)
                .then(res => {
                    console.log('@@@')
                    commit({ type: SET_USER, user: res.user });
                    saveToLocalStorage(res.user)
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
                    saveToLocalStorage(null);

                })
        },
    }
}


function getUserFromStorage() {
    var loggedinUser = JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
    console.log('GETTING FROM STORAGE', loggedinUser);
    return loggedinUser;
}

function saveToLocalStorage(user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}
