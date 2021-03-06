import vue from 'vue'
import GameService from '../services/GamesService'
export const LOAD_GAMES = 'games/loadGames';
export const DELETE_GAME = 'games/deleteGame';
export const GET_GAME_TO_EDIT = 'games/getGameToEdit';
export const CLEAR_GAME_TO_EDIT = 'games/clearGameToEdit';//mutation
export const SET_FILTER = 'games/setFilter';
export const SET_USER_FILTER = 'games/setUserFilter';
export const SET_SORT = 'games/setSort';
export const SET_TEMP_USER_ID = 'games/setTempUserId';
export const SET_AUDIENCE = 'games/setAudience'

const SET_GAMES = 'games/setGames';
const SET_GAME_TO_EDIT = 'games/setGameToEdit';
// const CLEAR_GAME_TO_EDIT = 'games/clearGameToEdit';

export default {
    state: {
        filterBy: '',
        games: [],
        gameToEdit: null,
        userFilterBy: '',
        tempUserId: '',
        sortBy: '',
        audience: 'all'
    },
    mutations: {
        [SET_GAMES](state, { games }) {
            state.games = games;
        },
        [DELETE_GAME](state, { gameId }) {
            state.games = state.games.filter(game => game._id !== gameId)
        },
        [SET_GAME_TO_EDIT](state, { gameToEdit }) {
            state.gameToEdit = JSON.parse(JSON.stringify(gameToEdit));
        },
        [CLEAR_GAME_TO_EDIT](state) {
            state.gameToEdit = null;
        },
        [SET_FILTER](state, { filterBy }) {
            state.filterBy = filterBy;
        },
        [SET_USER_FILTER](state, { filterBy }) {
            state.userFilterBy = filterBy;
        },
        [SET_TEMP_USER_ID](state, { ownerId }) {
            state.tempUserId = ownerId;
        },
        [SET_SORT](state, { sortBy }) {
            state.sortBy = sortBy
        },
        [SET_AUDIENCE](state, {audience}) {
            state.audience = audience
        }
    },
    getters: {
        gamesToDisplay(context) {
            var { games, filterBy, audience } = context;
            return games.filter(game => {
                return game.isPublic &&
                    (game.name.toLowerCase().includes(filterBy.toLowerCase()) ||
                        game.description.toLowerCase().includes(filterBy.toLowerCase()) 
                    ) && (game.audience === audience || audience === 'all')
            })
            return games
        },
        userGamesToDisplay(context) {
            var { games, tempUserId, userFilterBy, sortBy } = context;
            var filteredGames = games.filter(game => {
                return game.ownerId === tempUserId &&
                    (game.name.toLowerCase().includes(userFilterBy.toLowerCase()) ||
                        game.description.toLowerCase().includes(userFilterBy.toLowerCase()))
            })
            if (sortBy === 'time') {
                return filteredGames.sort(function (a, b) { return b.createdAt - a.createdAt })
            }
            else {
                return filteredGames.sort(function (a, b) { return b.playersCount - a.playersCount })
            }
        },
        gameToEdit(context) {
            return context.gameToEdit;
        },

    },
    actions: {
        [LOAD_GAMES]({ commit }, { rootState }) {
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

        [GET_GAME_TO_EDIT]({ commit, rootState }, { gameId }) {
            var loggedinUser = rootState.UserModule.loggedinUser
            return GameService.getObjToEdit(gameId)
                .then(gameToEdit => {
                    vue.set(gameToEdit, 'ownerId', loggedinUser._id)
                    commit({ type: SET_GAME_TO_EDIT, gameToEdit })
                })
        }
    }
}