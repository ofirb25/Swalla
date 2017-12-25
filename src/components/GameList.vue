<template>
  <section>
    <div class="games-container">
      <game-preview v-for="game in games" :game="game" :key="game._id" class="game-item"></game-preview>
      </div>
  </section>
</template>

<script>
import { LOAD_GAMES } from "../modules/GamesModule";
import GamePreview from './GamePreview'
export default {
  created() {
    this.$store.dispatch({ type: LOAD_GAMES }).then(games => {
      console.log(games);
    });
  },
  computed: {
    games() {
      return this.$store.getters.gamesToDisplay;
    }
  },
  components : {
    GamePreview
  }
};
</script>
<style lang="scss" scoped>
.games-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  
  .game-item {
    align-self: center;
    min-width: 250px;
    margin-bottom: 10px;
  }
}

</style>
