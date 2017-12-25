import axios from 'axios'
var gameUrl = 'http://localhost:3003/data/game'

function getGames() {
    return axios
    .get(gameUrl)
    .then(({data})=>{
        return data
    });
}

function saveCar(){

}

export default {
    getGames
}