<template>
  <section>
    <div class="games-container">
      <my-game-preview v-for="game in games" :game="game" :key="game._id"></my-game-preview>
      </div>
  </section>
</template>
<script>
import { LOAD_GAMES } from "../../modules/GamesModule";
import MyGamePreview from "./MyGamePreview";
export default {
  created() {
    this.$store.dispatch({ type: LOAD_GAMES }).then(games => {
    });
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
