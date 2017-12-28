<template>
  <section>
      <v-tabs fixed centered>
    <v-tabs-bar class="cyan" dark>
      <v-tabs-slider class="yellow"></v-tabs-slider>
      <v-tabs-item v-for="i in tabs" :key="i" :href="'#tab-' + i">
        {{ i }}
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content v-for="i in tabs" :key="i" :id="'tab-' + i">
          <game-details v-if="gameToEdit && isOnDetails " 
                        :gameDetails="gameToEdit" 
                        @onDetailschange="changeDetails" 
                        @cancleEdition="cancleAndReroute"></game-details>

          <enter-questions  v-if="!isOnDetails" 
                            :gameQuestions="gameToEdit"  
                            @cancleEdition="cancleAndReroute"
                            @save="saveUpdated"       ></enter-questions>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>
  
  </section>
</template>
<script>
import { GET_GAME_TO_EDIT } from "../modules/GamesModule";
import { CLEAR_GAME_TO_EDIT } from "../modules/GamesModule";
import GameDetails from "../components/EditCmps/GameDetails";
import EnterQuestions from "../components/EditCmps/EnterQuestions";
import GamesService from "../services/GamesService";

export default {
  data() {
    return {
      tabs: ["Game Details", "Enter Questions"],
      gameId: null,
      isOnDetails: true,
      game: null
    };
  },
  components: {
    GameDetails,
    EnterQuestions
  },
  methods: {
    cancleAndReroute() {
      this.$store.commit({ type: CLEAR_GAME_TO_EDIT });
    },
    changeDetails(updatedDetailsGame) {
      console.log("game before change", this.game);
      this.isOnDetails = !this.isOnDetails;
      this.game.name = updatedDetailsGame.name;
      this.game.description = updatedDetailsGame.description;
      this.game.img = updatedDetailsGame.img;
      this.game.isPublic = updatedDetailsGame.isPublic;
      this.game.audience = updatedDetailsGame.audience;
      console.log("GAME AFTER CHANGE: ", this.game); //finish the details - update all the fields
    },
    saveUpdated(updatedGame) {
      //finish save
      console.log("updatedGame - SAVEUPDATED: ", updatedGame);
      GamesService.updateGame(updatedGame).then(_ => {
        this.$store.commit(CLEAR_GAME_TO_EDIT);
        console.log('GAMETOEDIT CLEARED');
      });
    }
  },
  computed: {
    gameToEdit() {
      this.game = this.$store.getters.gameToEdit;
      return this.$store.getters.gameToEdit;
      console.log("this.game:", this.game);
    }
  },
  created() {
    this.gameId = this.$route.params.gameId;
    this.$store
      .dispatch({ type: GET_GAME_TO_EDIT, gameId: this.gameId })
      .then(_ => {
        console.log("GAME ID: ", this.gameId);
        // this.gameToEdit = this.$store.getters.gameToEdit;
        console.log("gameToEdit ", this.gameToEdit);
      });
  }
};
</script>

<style lang="scss">

</style>