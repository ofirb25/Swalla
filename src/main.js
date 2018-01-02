
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from './store'
import socketio from 'socket.io-client'
import VueSocketio from 'vue-socket.io'
import FBSignInButton from 'vue-facebook-signin-button'
import SocialSharing from 'vue-social-sharing'

// Vue.use(VueSocketio, socketio('http://swalla.herokuapp.com/'), store);
Vue.use(VueSocketio, socketio('http://localhost:3003'), store);
Vue.use(Vuetify)
Vue.use(FBSignInButton)
Vue.use(SocialSharing);
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
