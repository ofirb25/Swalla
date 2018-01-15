import GameService from '../services/GamesService'
export const LOAD_GAME = 'currMultiGame/loadGame';
export const PLAY_NEXT = 'currMultiGame/playNext';
export const ADD_POINTS = 'currMultiGame/addPoints';
export const ADD_PLAYER = 'currMultiGame/addPlayer';
export const RESET_STATE = 'currMultiGame/resetState';
export const SOCKET_CONNECT = 'currMultiGame/socketConnect';
export const SET_MULTI_MATCH = 'currMultiGame/setMultiGame';
export const SET_MATCH = 'currMultiGame/setMatch';
export const INCREMENT_ANSWERS_COUNT = 'currMultiGame/incrementAnswers';

const SET_GAME = 'currMultiGame/setGame';

export default {
    state: {
        socketIsConnected: false,
        game: null,
        currPlayerId: null,
        match: null,
        // players: [],
        currQuestion: 0,
        answersCount: 0
    },
    mutations: {
        [SET_GAME](state, { game }) {
            state.game = game;
        },
        [PLAY_NEXT](state) {
            state.currQuestion++
            state.answersCount = 0
        },
        [ADD_POINTS](state, { players }) {
            state.match.players = players
        },
        [ADD_PLAYER](state, { player }) {
            state.players.push(player)
        },
        [INCREMENT_ANSWERS_COUNT](state, { answersCount }) {
            state.answersCount = answersCount
        },
        [RESET_STATE](state) {
            state.match = null
            state.game = null
            state.players = []
            state.currQuestion = 0
            state.TotalPoints = 0
        },
        [SOCKET_CONNECT](state) {
            state.socketIsConnected = true;
        },
        [SET_MULTI_MATCH](state, { match, socketId }) {

            state.currPlayerId = socketId
            state.match = match
        }
    },
    getters: {
        match(context) {
            return context.match
        },
        currMultiGame(context) {
            return context.game
        },
        currMultiQuestion(context) {
            if (context.game) {
                return context.game.questions[context.currQuestion] || null
            }
        },
        answersCount(context) {
            return context.answersCount
        },
        multiPlayers(context) {
            if (context.match) {
                return context.match.players.sort(function (a, b){
                    return b.score - a.score;
                })
            }

        },
        isHosting(context) {
            if (context.match) {
                return context.currPlayerId === context.match.hostId
            }
        },
        pin(context) {
            if (context.match) {
                return context.match.pin
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
        [ADD_POINTS]({ commit }, { players, answersCount }) {
            commit({ type: ADD_POINTS, players })
            commit({ type: INCREMENT_ANSWERS_COUNT, answersCount })
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
        [RESET_STATE]({ commit }) {
            commit({ type: RESET_STATE })
        },
        [SOCKET_CONNECT]({ commit }) {
            commit({ type: SOCKET_CONNECT })
        },
        [SET_MULTI_MATCH]({ commit }, { match, socketId }) {
            commit({ type: SET_MULTI_MATCH, match, socketId })
        }
    }
}