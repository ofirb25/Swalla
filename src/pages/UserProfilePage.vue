<template>
    <section>
        <div class="container">
            <user-preview class="user-preview" :userId="userId" :userToDisplay="userToDisplay"></user-preview>
            <my-game-list class="list-componenet" :canEdit="canEdit" :userId="userId"></my-game-list>
        </div>
    </section>
</template>

<script>
import MyGameList from "../components/AdminCmps/MyGameList";
import UserPreview from "../components/UserCmps/UserPreview";
import UserService from "../services/UserService";
import GamesService from "../services/GamesService";

import {
  LOAD_GAMES,
  SET_FILTER,
  SET_TEMP_USER_ID
} from "../modules/GamesModule";

export default {
  data() {
    return {
      canEdit: false,
      userToDisplay: null
    };
  },
  components: {
    MyGameList,
    UserPreview
  },
  created() {
    this.setUser();
    this.setGames();
  },
  computed: {
    userId() {
      return this.$route.params.userId;
    }
  },
  methods: {
    setUser() {
      UserService.getUserById(this.userId)
        .then(user => {
          this.userToDisplay = user;
        })
        .catch(err => console.log("Error getting UserById: ", err));
      var loggedinUserId = this.$store.getters.loggedinUserId;
      if (this.userId === loggedinUserId) this.canEdit = true;
      else this.canEdit = false;
    },
    setGames() {
      this.$store.dispatch({ type: LOAD_GAMES }).then(games => {});
      this.$store.commit({
        type: SET_TEMP_USER_ID,
        ownerId: this.$route.params.userId
      });
    }
  },
  watch: {
    userId() {
      this.setGames();
      this.setUser();
    }
  }
};
</script>
<style lang="scss" scoped>
section {
  height: 100%;
}
.list-componenet {
  width: 65%;
  max-height: 65%;
}
.container {
  max-width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  margin: 0;
  width: 100%;
  height: 100%;
  
}
.user-preview{
  max-width: 35%;
  min-width: 32%;
}
</style>
