<template>
  <v-toolbar>
    <router-link class="logo-router" tag="div" :to="'/'"><v-toolbar-title><img class="logo" src="../assets/swalla2.png"></v-toolbar-title></v-toolbar-title></router-link> 
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">

      <router-link tag="div" :to="'/'">
      <v-btn class="navBtn" flat>Home</v-btn>
      </router-link> 

      <router-link tag="div" :to="'/login-page'">
      <v-btn class="navBtn" flat v-if="!islogin">Login/Signup</v-btn>
      </router-link> 

      <router-link tag="div" :to="'/add-game'">
      <v-btn class="navBtn" flat v-if="islogin">Create</v-btn>
      </router-link> 

      <router-link tag="div" :to="'/my-games'">
      <v-btn class="navBtn" flat v-if="islogin">My Games</v-btn>
      </router-link> 

      <v-btn class="navBtn" flat v-if="islogin" @click="logoutClicked">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
        islogin: true
    };
  },
  methods: {
    logoutClicked(){
      this.islogin = !this.islogin;
    }
  }
};
</script>

<style>
.logo{
  width: 90px;
  cursor: pointer;
}
.navBtn{
    height: 100%;
    margin: 0;
}
.logo-router {
  background-color: rgba(255, 255, 255, 0)
}
</style>
