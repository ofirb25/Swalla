import GameService from '../services/GamesService'
export const LOAD_GAME = 'currGame/loadGame';
export const PLAY_NEXT = 'currGame/playNext';
export const ADD_POINTS = 'currGame/addPoints';

const SET_GAME = 'currGame/setGame';

export default {
    state: {
        game: null,
        currQuestion: 0,
        TotalPoints: 0,
        LastScore: 0
    },
    mutations: {
        [SET_GAME](state, { game }) {
            state.game = game;
        },
        [PLAY_NEXT](state) {
            state.currQuestion++
        },
        [ADD_POINTS](state,{points}) {
            state.TotalPoints+= points;
            state.LastScore = points
        }
    },
    getters: {
        currGame(context) {
            return context.game
        },
        currQuestion(context) {
            return context.game.questions[context.currQuestion] || null
        },

    },
    actions: {
        [LOAD_GAME]({ commit },{gameId}) {
            return GameService.getGameById(gameId)
                .then(game => {

                    commit({ type: SET_GAME, game })
                })
        },
        [PLAY_NEXT]({ commit }) {
            commit({ type: PLAY_NEXT })
        },
        [ADD_POINTS]({ commit}, {points}) {
            commit({type: ADD_POINTS, points})
        }
    }
}