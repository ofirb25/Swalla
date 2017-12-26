import GameService from '../services/GamesService'
export const LOAD_GAMES = 'games/loadGames';

const SET_GAMES = 'games/setGames';

export default {
    state: {
        filterBy: null,
        games: []
    },
    mutations: {
        [SET_GAMES] (state,{games}) {
            state.games = games;
        }
    },
    getters: {
        gamesToDisplay(context) {
            var {games, filterBy} = context;
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
        }
    }
}