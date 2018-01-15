import axios from 'axios'

// const URL = 'http://localhost:3003'
// const userUrl = 'http://localhost:3003/data/user'
const URL = 'http://swalla.herokuapp.com';
const userUrl = 'http://swalla.herokuapp.com/data/user';


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

const updateUser = (user, isMultiGame) => {

    return axios
        .get(`${userUrl}/${user._id}`)
        .then(({ data }) => {
            data.stats.multiGames = parseInt(data.stats.multiGames) + isMultiGame
            data.stats.singleGames = parseInt(data.stats.singleGames) + !isMultiGame
            var updateduUser = Object.assign({}, data)
            delete updateduUser._id
            return axios.put(`${userUrl}/${user._id}`, updateduUser)
                .then(({ data }) => {
                    return data
                })
        })
}

const updateUserAnsCount = (user, isCorrect) => {
    console.log(isCorrect)
    return axios
        .get(`${userUrl}/${user._id}`)
        .then(({ data }) => {
            console.log(data)
            data.stats.correctAns = parseInt(data.stats.correctAns) + isCorrect
            data.stats.wrongAns = parseInt(data.stats.wrongAns) + !isCorrect
            var updateduUser = Object.assign({}, data)
            delete updateduUser._id
            return axios.put(`${userUrl}/${user._id}`, updateduUser)
                .then(({ data }) => {
                    console.log(data)
                    
                    return data
                })
        })
}



export default {
    signup,
    login,
    logout,
    getUserById,
    updateUser,
    updateUserAnsCount
} 