import GamesModule from './modules/GamesModule'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        GamesModule
    }
})