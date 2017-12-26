<template>
  <section>
    <div class="games-container">
    <router-link v-for="game in games" :to="'/my-game/'+game._id" :key="game._id">
    <my-game-preview :game="game" :key="game._id"></my-game-preview>
      </router-link>      
      </div>
  </section>
</template>
<script>
import { LOAD_GAMES } from "../../modules/GamesModule";
import MyGamePreview from "./MyGamePreview";
export default {
  created() {
    this.$store.dispatch({ type: LOAD_GAMES }).then(games => {});
  },
  computed: {
    games() {
      return this.$store.getters.gamesToDisplay;
    }
  },
  components: {
    MyGamePreview
  }
};
</script>
