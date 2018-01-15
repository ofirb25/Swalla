<template>

  <section class="my-game-section">
    <div class="game-card">
      <my-game-card :game="game" :user="user" :isAdmin="isAdmin" :onEditMode="onEditMode" 
      :editableGame="editableGame" @updateDetails="updateDetails" :fixer="fixer"></my-game-card>
    </div>
    <div class="game-quests">
      <my-quests :game="game" :onEditMode="onEditMode" :editableGame="editableGame"
      @updateDetails="updateDetails" @saveGame="saveGame" @cancelEdit="cancelEdit" :fixer="fixer"></my-quests>
    </div>
  </section>


</template>
<script>
import GameService from "../services/GamesService";
import UserService from "../services/UserService";
import MyGameCard from "../components/UserGameDetails/MyGameCard";
import MyQuests from "../components/UserGameDetails/MyQuests";
import { GET_GAME_TO_EDIT } from "../modules/GamesModule";
import { CLEAR_GAME_TO_EDIT } from "../modules/GamesModule";

export default {
  data() {
    return {
      game: null,
      user: null,
      isAdmin: false,
      editableGame: null,
      fixer: true,
      gameId: null
    };
  },
  created() {
    var gameId = this.$route.params.gameId;
    this.gameId = gameId;
    this.setGameToEdit();
    if (!(this.$route.params.action === "add")) {
      GameService.getGameById(gameId).then(game => {
        this.game = game;
        UserService.getUserById(game.ownerId).then(user => {
          this.user = user;
          var loggedinUserId = this.$store.getters.loggedinUserId;
          if (user._id === loggedinUserId) this.isAdmin = true;
          else this.isAdmin = false;
        });
      });
    }
  },
  components: {
    MyGameCard,
    MyQuests
  },
  computed: {
    onEditMode() {
      return (
        this.$route.params.action === "add" ||
        this.$route.params.action === "edit"
      );
    }
  },
  methods: {
    updateDetails(updatedGame) {
      this.editableGame = updatedGame;
      this.fixer = !this.fixer;
    },
    saveGame() {
      // if (this.editableGame.img === '') this.editableGame.img = 'http://nowiknow.com/quizzes/wp-content/uploads/2016/07/question-mark-background-vector.jpg'
      this.editableGame.ownerName = this.$store.getters.loggedinUserName;
      GameService.updateGame(this.editableGame).then(game => {
        UserService.getUserById(game.data.ownerId).then(user => {
          this.user = user;
        });
        this.game = game.data;
        this.$store.commit(CLEAR_GAME_TO_EDIT);
        if (this.editableGame._id)
          this.$router.push("/my-game/details/" + this.editableGame._id);
        else this.$router.push("/my-game/details/" + game.data._id);
      });
    },
    cancelEdit() {
      this.$store.commit({ type: CLEAR_GAME_TO_EDIT });
      if (this.editableGame._id) {
        this.$router.push("/my-game/details/" + this.editableGame._id);
      } else this.$router.push("/");
    },
    setGameToEdit() {
      if (this.$route.params.action === "add") this.gameId = null;
      this.$store
        .dispatch({ type: GET_GAME_TO_EDIT, gameId: this.gameId })
        .then(_ => {
          this.editableGame = this.$store.getters.gameToEdit;
          this.fixer = !this.fixer;
        });
    }
  },
  watch: {
    onEditMode: function(_) {
      this.setGameToEdit();
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
