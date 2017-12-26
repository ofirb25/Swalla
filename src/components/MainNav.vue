<template>
  <v-toolbar>
    <router-link tag="div" :to="'/'"><v-toolbar-title>Swalala</v-toolbar-title></router-link> 
    <v-spacer></v-spacer>
    <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link tag="div" :to="'/'"><v-btn class="navBtn" flat>Home</v-btn></router-link> 
      <v-btn class="navBtn" flat v-if="!islogin">Login/Signup</v-btn>
      <v-btn class="navBtn" flat v-if="islogin">Create</v-btn>
      <router-link tag="div" :to="'/my-games'"><v-btn class="navBtn" flat v-if="islogin">My Games</v-btn></router-link> 
      <v-btn class="navBtn" flat v-if="islogin">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
        islogin: true
    };
  }
};
</script>

<style>
.navBtn{
    height: 100%;
    margin: 0;
}
</style>
