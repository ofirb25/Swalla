<template>
  <section v-if="userToDisplay" class="container">
    <v-avatar size="200px">
      <img :src="userToDisplay.img" alt="John">
    </v-avatar>
    <label>Nick :  </label><label>{{userToDisplay.name}}</label>
    <label>UserName :  </label><label>{{userToDisplay.username}}</label>    
  </section>
</template>
<script>
  import UserService from "../../services/UserService";
  import GamesService from "../../services/GamesService";

  export default {
    data() {
      return {
        userId: null,
        userToDisplay: null,
        userGames: null
      };
    },
    methods: {},
    computed: {},
    created() {
      this.userId = this.$route.params.userId;
      UserService.getUserById(this.userId)
        .then(user => {
          this.userToDisplay = user;
          console.log("Got User To Display: ", user);
        })
        .catch(err => console.log("Error getting UserById: ", err));
    }
  };
</script>

<style lang="scss" scoped>
  .list-componenet {
      max-width: 50%
  }
  .container{
      display: flex;
      flex-direction: column;
  }
</style>