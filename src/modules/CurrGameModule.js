import GameService from '../services/GamesService'
export const LOAD_GAME = 'currGame/loadGame';
export const PLAY_NEXT = 'currGame/playNext';
export const ADD_POINTS = 'currGame/addPoints';
export const ADD_PLAYER = 'currGame/addPlayer';
export const RESET_STATE = 'currGame/resetState';

const SET_GAME = 'currGame/setGame';

export default {
    state: {
        game: null,
        currPlayerId: 1,
        players: [],
        currQuestion: 0,
        TotalPoints: 0,
    },
    mutations: {
        [SET_GAME](state, { game }) {
            state.game = game;
        },
        [PLAY_NEXT](state) {
            state.currQuestion++
        },
        [ADD_POINTS](state, { points }) {
            //console.log
            var playerIdx = state.players.findIndex(player=>player.id===state.currPlayerId)
            state.players[playerIdx].points+= points
        },
        [ADD_PLAYER](state, { player }) {
            state.players.push(player)
        },
        [RESET_STATE](state) {
            state.game = null
            state.players=  []
            state.currQuestion= 0
            state.TotalPoints= 0
        },

    },
    getters: {
        currGame(context) {
            return context.game
        },
        currQuestion(context) {
            if (context.game) {
                return context.game.questions[context.currQuestion] || null
            }
        },
        currGameScores(context){
            if(context.players.length) {
                return context.players
            }
        }

    },
    actions: {
        [LOAD_GAME]({ commit }, { gameId }) {
            return GameService.getGameById(gameId)
                .then(game => {
                    commit({ type: SET_GAME, game })
                })
        },
        [PLAY_NEXT]({ commit }) {
            commit({ type: PLAY_NEXT })
        },
        [ADD_POINTS]({ commit }, { points,userId }) {
            commit({ type: ADD_POINTS, points })
        },
        [ADD_PLAYER]({ commit }, { playerName }) {
            var player = {
                //make it get the socket id from db
                id: 1,
                name: playerName || 'Guest',
                points: 0
            }
            commit({ type: ADD_PLAYER, player })
        },
        [RESET_STATE]({commit}){
            commit({type:RESET_STATE})
        },

    }
}