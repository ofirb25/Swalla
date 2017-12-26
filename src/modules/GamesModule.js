import GameService from '../services/GamesService'

export const LOAD_GAMES = 'games/loadGames';
export const DELETE_GAME = 'games/deleteGame';


const SET_GAMES = 'games/setGames';

export default {
    state: {
        filterBy: null,
        games: []
    },
    mutations: {
        [SET_GAMES](state, { games }) {
            state.games = games;
        },
        [DELETE_GAME](state, {gameId}) {
            state.games = state.games.filter(game => game._id !== gameId)
        },
    },
    getters: {
        gamesToDisplay(context) {
            var { games, filterBy } = context;
            console.log(games)
            return games
        }
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

    }
}