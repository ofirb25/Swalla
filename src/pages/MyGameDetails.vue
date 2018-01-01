<template>
  <section class="my-game-section">
    <div class="game-card">
      <my-game-card :game="game" :user="user" :canEdit="canEdit"></my-game-card>
    </div>
    <div class="game-quests">
      <my-quests :game="game" ></my-quests>
    </div>
  </section>
</template>
<script>
import GameService from "../services/GamesService";
import UserService from "../services/UserService";
import MyGameCard from "../components/AdminGameDetails/MyGameCard";
import MyQuests from "../components/AdminGameDetails/MyQuests";
export default {
  data() {
    return {
      game: null,
      user: null,
      canEdit: false
    };
  },
  created() {
    var gameId = this.$route.params.gameId;
    GameService.getGameById(gameId).then(game => {
      this.game = game;
      UserService.getUserById(game.ownerId).then(user => {
        this.user = user;
        var loggedinUserId = this.$store.getters.loggedinUserId;
        if (user._id === loggedinUserId) this.canEdit = true;
        else this.canEdit = false;
      });
    });
  },
  components: {
    MyGameCard,
    MyQuests
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
