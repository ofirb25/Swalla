import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../pages/HomePage';
import GameDetails from '../pages/GameDetails';
import UserProfilePage from '../pages/UserProfilePage';
import MyGamesDetails from '../pages/MyGameDetails';
import PlayPage from '../pages/PlayPage';
import PlayMulti from '../pages/PlayMulti';
import EditGamePage from '../pages/EditGamePage';
import LoginPage from '../pages/LoginPage'
import SignupPage from '../pages/SignupPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home-Page',
      component: HomePage
    },
    {
      path: '/login-page',
      name : 'login-page',
      component: LoginPage
    },
    {
      path: '/signup-page',
      name : 'signup-page',
      component: SignupPage
    },
    {
      path: '/game/:gameId/play-multi',
      name: 'play multi',
      component: PlayMulti
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
      path: '/user-profile/:userId',
      name: 'User-Profile-Page',
      component: UserProfilePage
    },
    {
      path: '/my-game/:gameId',
      name: 'My-Game-details',
      component: MyGamesDetails
    },
    {
      path: '/edit-game/:gameId',
      name: 'Edit-Game-Page',
      component: EditGamePage
    },
    {
      path: '/add-game',
      name: 'add-Game-Page',
      component: EditGamePage
    }
  ]
})
