import axios from 'axios'
var gameUrl = 'http://localhost:3003/data/game'

function getGames() {
    return axios
        .get(gameUrl)
        .then(({ data }) => {
            return data
        });
}

function getGameById(id) {
    return axios
        .get(`${gameUrl}/${id}`)
        .then(({ data }) => {
            console.log(id)
            console.log('from gameservice',data)
            return data
        })
        .catch(err => err)
}


const getObjToEdit = (id) => {
    return new Promise((resolve, reject) => {
        if (!id) {
            var emptyObj = _getEmptyGame()
            // console.log('emptyObj FROM SERVICE: ', emptyObj);
            resolve(_getEmptyGame())
        }else {
            getGameById(id)
                .then(game => resolve(game))
                .catch(err => reject(err))
        }
    });
}

const _getEmptyGame = () => { //doens't get the Owner Id from thr DB yet!!!
    return {                 //needs to add audiences (array) to all OBJ in server and service
        ownerId: 0,
        name: '',
        description: '',
        img: '',
        highscore: 0,
        createdAt: null,
        playersCount: 0,
        questions: [
            {
                title: '',
                img: '',
                time: 15000,
                answers: [
                ]
            }
        ],
        topTen: [
            {
            }
        ]
    }
}

function deleteGame(gameId) {
    return axios.delete(`${gameUrl}/${gameId}`)
}

export default {
    getGames,
    getGameById,
    deleteGame,
    getObjToEdit
}