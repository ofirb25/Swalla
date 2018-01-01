<template>
    <section>
        <v-toolbar class="nav">
            <router-link class="logo-router" tag="div" :to="'/'">
                <v-toolbar-title>
                    <img class="logo" src="../assets/swalla2.png">
                </v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-items class="hidden-sm-and-down">

                <router-link tag="div" :to="'/'">
                    <v-btn class="navBtn" flat>Home</v-btn>
                </router-link>

                <router-link tag="div" :to="'/login-page'">
                    <v-btn class="navBtn" flat v-if="!loggedInUser">Login/Signup</v-btn>
                </router-link>

                <router-link tag="div" :to="'/add-game'">
                    <v-btn class="navBtn" flat v-if="loggedInUser">Create</v-btn>
                </router-link>

                <router-link tag="div" :to="'/user-profile/'+loggedInUser._id" v-if="loggedInUser">
                    <v-btn class="navBtn" flat >{{loggedInUser.name}}</v-btn>
                </router-link>

                <v-btn class="navBtn" flat v-if="loggedInUser" @click="logout">Logout</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-navigation-drawer temporary v-model="drawer" light absolute>
            <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="../assets/swalla2.png" />
                    </v-list-tile-avatar>
                </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>

                <router-link tag="div" :to="'/'" >
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Home</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>

                <router-link tag="div" :to="'/add-game'" v-if="loggedInUser">
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Create</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>

                <router-link tag="div" :to="'/user-profile/'+loggedInUser._id" v-if="loggedInUser">
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>{{loggedInUser.name}}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>

                <router-link tag="div" :to="'/login-page'" v-if="!loggedInUser">
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title>Login/Signup</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </router-link>

                <v-list-tile v-if="loggedInUser" @click="logout" >
                    <v-list-tile-content>
                        <v-list-tile-title>Logout</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </section>
</template>

<script>
import { SIGNOUT } from "../modules/UserModule.js";

export default {
  data() {
    return {
      islogin: true,
      drawer: null
    };
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: SIGNOUT }).then(() => {
        this.$router.push("/");
      });
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.state.UserModule.loggedinUser;
    }
  }
};
</script>

<style>
.logo {
  width: 90px;
  cursor: pointer;
  /* padding: 5px; */
}
.navBtn {
  height: 100%;
  margin: 0;
}
.logo-router {
  background-color: rgba(255, 255, 255, 0);
}

@media (max-width: 700px) {
  .nav {
    padding: 12px;
  }
}
</style>
