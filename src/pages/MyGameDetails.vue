<template>
  <section class="my-game-section">
    <div class="game-card">
      <my-game-card :game="game" ></my-game-card>
    </div>
    <div class="game-quests">
      <my-quests :game="game" ></my-quests>
    </div>
  </section>
</template>
<script>
import GameService from "../services/GamesService";
import MyGameCard from '../components/AdminGameDetails/MyGameCard';
import MyQuests from '../components/AdminGameDetails/MyQuests'
export default {
  data() {
    return {
      game: null
    };
  },
  created() {
    var gameId = this.$route.params.gameId;
    GameService.getGameById(gameId).then(game => {
      this.game = game;
    });
  },
  components: {
    MyGameCard,
    MyQuests
  }
};
</script>
<style lang="scss" scoped>
  .my-game-section{
    display: flex;
    height: 100%;
    div {
      height: 100% !important;
    };
    .game-card {
      width: 35%;
    }
    .game-quests {
      width: 65%;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
</style>
