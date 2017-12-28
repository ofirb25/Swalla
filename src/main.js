
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from './store'
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
Vue.use(VueSocketio, socketio('http://localhost:3003'), store);
Vue.use(Vuetify)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
