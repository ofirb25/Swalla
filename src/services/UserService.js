import axios from 'axios'

const URL = 'http://localhost:3003'
const userUrl = 'http://localhost:3003/data/user'
// const URL = 'http://swalla.herokuapp.com';
// const userUrl = 'http://swalla.herokuapp.com/data/user';


function signup(userDetails) {
    userDetails.signInDate = Date.now()
    return axios.post(`${URL}/data/user`, userDetails)
        .then(_ => {
            console.log('userDetails', userDetails);
            return login(userDetails)
        })
        .catch(err => err)
}

function login(userCreds) {
    return axios.post(`${URL}/login`, userCreds)
        .then(({ data }) => {
            return data
        })

}

function logout() {
    return axios.get(`${URL}/logout`)
}

const getUserById = (userId) => {
    return axios.get(`${userUrl}/${userId}`)
        .then(({ data }) => {
            // console.log('Inside getUser.then(), user : ', data);
            return data;
        }).catch(err => err);
}


export default {
    signup,
    login,
    logout,
    getUserById
} 