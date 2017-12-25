import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage'
import MyGamesPage from '../pages/MyGamesPage'

Vue.use(Router)

export default new Router({
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'Home-Page',
      component: HomePage
    },
    {
      path: '/MyGames',
      name: 'My-Games-Page',
      component: MyGamesPage
    }

  ]
})
