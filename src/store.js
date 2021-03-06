import GamesModule from './modules/GamesModule'
import CurrGameModule from './modules/CurrGameModule'
import UserModule from './modules/UserModule'
import CurrMultiGameModule from './modules/CurrMultiGameModule'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        GamesModule,
        CurrGameModule,
        UserModule,
        CurrMultiGameModule
    }
})