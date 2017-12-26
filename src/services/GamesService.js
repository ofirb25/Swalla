import axios from 'axios'
var gameUrl = 'http://localhost:3003/data/game'

function getGames() {
    return axios
    .get(gameUrl)
    .then(({data})=>{
        return data
    });
}

function getGameById(id) {
    return axios
    .get(`${gameUrl}/${id}`)
    .then(({data})=>{
        console.log(data)
        return data
    })
    .catch(err=>err)
}

function deleteGame(gameId) {
    return axios.delete(`${gameUrl}/${gameId}`)
}

export default {
    getGames,
    getGameById,
    deleteGame
}