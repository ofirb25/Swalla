import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage';
import GameDetails from '../pages/GameDetails';
import MyGamesPage from '../pages/MyGamesPage';

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
      path: '/game/:gameId',
      name: 'game-details',
      component: GameDetails
    },
    {
      path: '/my-games',
      name: 'My-Games-Page',
      component: MyGamesPage
    }
  ]
})
