import GameService from '../services/GamesService'
export const LOAD_GAMES = 'games/loadGames';
export const DELETE_GAME = 'games/deleteGame';
export const GET_GAME_TO_EDIT = 'games/getGameToEdit';
export const CLEAR_GAME_TO_EDIT = 'games/clearGameToEdit';//mutation
export const SET_FILTER = 'games/setFilter';

const SET_GAMES = 'games/setGames';
const SET_GAME_TO_EDIT = 'games/setGameToEdit';
// const CLEAR_GAME_TO_EDIT = 'games/clearGameToEdit';

export default {
    state: {
        filterBy: null,
        games: [],
        gameToEdit: null,
        filterQuery: ''
    },
    mutations: {
        [SET_GAMES](state, { games }) {
            state.games = games;
        },
        [DELETE_GAME](state, { gameId }) {
            state.games = state.games.filter(game => game._id !== gameId)
        },
<<<<<<< HEAD
        [SET_GAME_TO_EDIT](state, {gameToEdit}){
            console.log('IN THE COMMIT');
            state.gameToEdit =  JSON.parse(JSON.stringify(gameToEdit));
=======
        [SET_GAME_TO_EDIT](state, { gameToEdit }) {
            state.gameToEdit = JSON.parse(JSON.stringify(gameToEdit));
>>>>>>> a04f8edd2e0d5a1e79cb1406e99abfc2ab1da23d
        },
        [CLEAR_GAME_TO_EDIT](state) {
            state.gameToEdit = null;
        },
        [SET_FILTER](state, { filterBy }) {
            state.filterBy = filterBy;
        },

    },
    getters: {
        gamesToDisplay(context) {
<<<<<<< HEAD
            var {games, filterBy} = context;
=======
            var { games, filterBy } = context;
>>>>>>> a04f8edd2e0d5a1e79cb1406e99abfc2ab1da23d
            // console.log('games From Games Moudle Getter'.games)
            if (!filterBy) return games
            return games.filter(game => {
                return game.name.toLowerCase().includes(filterBy.toLowerCase()) ||
                game.description.toLowerCase().includes(filterBy.toLowerCase())
            })
            return games
        },
        gameToEdit(context) {
            return context.gameToEdit;
        },

    },
    actions: {
        [LOAD_GAMES]({ commit, rootState }) {
            return GameService.getGames()
                .then(games => {
                    commit({ type: SET_GAMES, games })
                })
        },
        [DELETE_GAME]({ commit }, { gameId }) {
            return GameService.deleteGame(gameId)
                .then(_ => {
                    commit({ type: DELETE_GAME, gameId })
                })
        },

        [GET_GAME_TO_EDIT]({ commit, gameId }) {
            return GameService.getObjToEdit(gameId)
                .then(gameToEdit => {
                    // console.log('GAME FROM SERVICE IN MOUDLE : ', gameToEdit);
                    commit({ type: SET_GAME_TO_EDIT, gameToEdit })
                })
        }
    }
}