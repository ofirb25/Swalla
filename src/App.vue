<template>
  <div id="app">
    <v-app>
    <main-nav></main-nav>
    <router-view class="router"/>
    </v-app>
  </div>
</template>

<script>
import MainNav from './components/MainNav'

export default {
  name: 'app',
   components : {
    MainNav
  }
}
</script>

<style lang="scss">
  @import './style/style';

.router {
padding-top: 50px;
}
  
</style>
