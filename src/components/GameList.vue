<template>
  <section>
    <div class="games-container">
      <router-link v-for="game in games" :to="'/game/'+game._id" :key="game._id">
      <game-preview :game="game"  class="game-item"></game-preview>
      </router-link>
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
  flex-wrap: wrap;

    .game-item {
      width:300px;
      margin:1em;
      border-radius: 5px;
      cursor: pointer;
     

    }

     @media (max-width:700px){
         display: flex;
         flex-direction: column;
         align-items: center;
      }
}

</style>
