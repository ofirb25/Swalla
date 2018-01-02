<template>
  <section class="my-game-section">
    <div class="game-card">
      <my-game-card :game="game" :user="user" :canEdit="canEdit" :onEditMode="onEditMode" 
      :editableGame="editableGame" @updateDetails="updateDetails"></my-game-card>
    </div>
    <div class="game-quests">
      <my-quests :game="game" :onEditMode="onEditMode" :editableGame="editableGame"
      @updateDetails="updateDetails" @saveGame="saveGame" @cancelEdit="cancelEdit"></my-quests>
    </div>
  </section>
</template>
<script>
import GameService from "../services/GamesService";
import UserService from "../services/UserService";
import MyGameCard from "../components/AdminGameDetails/MyGameCard";
import MyQuests from "../components/AdminGameDetails/MyQuests";
import { GET_GAME_TO_EDIT } from "../modules/GamesModule";
import { CLEAR_GAME_TO_EDIT } from "../modules/GamesModule";

export default {
  data() {
    return {
      game: null,
      user: null,
      canEdit: false,
      onEditMode: false,
      onAddMode: false,
      editableGame: null
    };
  },
  created() {
    var gameId = this.$route.params.gameId;
    GameService.getGameById(gameId).then(game => {
      this.game = game;
      this.editableGame = JSON.parse(JSON.stringify(game));
      UserService.getUserById(game.ownerId).then(user => {
        this.user = user;
        var loggedinUserId = this.$store.getters.loggedinUserId;
        if (user._id === loggedinUserId) this.canEdit = true;
        else this.canEdit = false;
        if (this.action) {
          this.switchMethod();
          this.$store.dispatch({ type: GET_GAME_TO_EDIT, gameId }).then(_ => {
            this.game = this.$store.getters.gameToEdit;
          });
        }
      });
    });
  },
  components: {
    MyGameCard,
    MyQuests
  },
  computed: {
    action() {
      return this.$route.params.action;
    }
  },
  watch: {
    action: function(_) {
      this.switchMethod();
    }
  },
  methods: {
    switchMethod() {
      var gameId = this.$route.params.gameId;
      if (this.action === "edit" || this.action === "add")
        this.onEditMode = true;
      else this.onEditMode = false;
      this.$store.dispatch({ type: GET_GAME_TO_EDIT, gameId }).then(_ => {
        this.game = this.$store.getters.gameToEdit;
      });
    },
    updateDetails(updatedGame) {
      this.editableGame = updatedGame;
    },
    saveGame() {
      GameService.updateGame(this.editableGame).then(game => {
        this.$store.commit(CLEAR_GAME_TO_EDIT);
        if (this.editableGame._id)
          this.$router.push("/my-game/details/" + this.editableGame._id);
        else this.$router.push("/my-game/details/" + game.data._id);
      });
    },
    cancelEdit() {
      this.$store.commit({ type: CLEAR_GAME_TO_EDIT });
      if (this.editableGame._id) {
        this.$router.push("/my-game/details/" + this.editableGame._id)
      }
      else this.$router.push('/')
    }
  }
};
</script>
<style lang="scss" scoped>
.my-game-section {
  display: flex;
  height: 100%;
  @media (max-width: 700px) {
    flex-direction: column;
  }
  div {
    height: 100% !important;
  }
  .game-card {
    width: 35%;
    @media (max-width: 700px) {
      width: 100%;
    }
  }
  .game-quests {
    width: 65%;
    display: flex;
    align-items: center;
    flex-direction: column;
    @media (max-width: 700px) {
      width: 100%;
    }
  }
}
</style>
