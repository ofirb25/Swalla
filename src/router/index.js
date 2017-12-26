import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage';
import GameDetails from '../pages/GameDetails';
import MyGamesPage from '../pages/MyGamesPage';
import PlayPage from '../pages/PlayPage';
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
      path: '/game/:gameId/play',
      name: 'play game',
      component: PlayPage,
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
    },
  ]
})
