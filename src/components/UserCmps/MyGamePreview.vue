<template>
    <v-list two-line class="my-game-prev">
        <v-list-tile avatar :key="game._id">
            <img :src="game.img" class="my-game-img"/>
            <v-list-tile-content>
                <div v-if="canEdit">
                    <p @click.prevent="deleteGame(game._id)" class="game-prev-control">Delete</p>
                    <router-link :to="'/my-game/edit/'+game._id"><p class="game-prev-control">Edit</p></router-link>
                </div>
                <v-list-tile-title v-html="game.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="'temp: '+game.createdAt"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html="'questions:' + game.questions.length"></v-list-tile-sub-title>
            </v-list-tile-content>
                <div>
                    <v-btn flat color="teal" value="play" @click.native.stop.prevent="dialog = true">
                        <span>Play</span>
                        <v-icon>play_circle_outline</v-icon>
                    </v-btn>
                </div>
                <div>
                  <router-link :to="'/user-profile/'+userId">
                  <social-sharing :url="'https://swalla.herokuapp.com/my-game/details/' + game._id "
                      title=""
                      description=""
                      quote=""
                      hashtags="vuejs,javascript,framework"
                      twitter-user="vuejs"
                      inline-template>
                  <div>
                      <network network="facebook">
                    <v-btn flat color="teal" value="share">
                        <span>Share</span>
                        <v-icon>share</v-icon>
                    </v-btn>
                      </network>
                    </div>
                    </social-sharing>
                    </router-link>
                </div>
       </v-list-tile>
       <startgame-modal  @closeDialog="dialog=false" :dialog="dialog" :game="game"></startgame-modal>

    </v-list>
</template>
<script>
import { LOAD_GAMES, DELETE_GAME } from "../../modules/GamesModule";
import StartgameModal from "../EditCmps/StartGameModal.vue";

export default {
  props: {
    game: Object,
    canEdit: Boolean,
    userId: String
  },
  methods: {
    deleteGame(gameId) {
      this.$store.dispatch({ type: DELETE_GAME, gameId });
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  components: {
    StartgameModal
  }
};
</script>
<style lang="scss" scoped>
.my-game-img {
  max-width: 200px;
  max-height: 100px;
  margin-right: 1em;
}
.game-prev-control {
  margin: 0;
  font-size: 12px;
  display: inline-block;
  visibility: hidden;
}
.list__tile__sub-title {
  font-size: 0.8em;
}

.my-game-prev {
  cursor: pointer;
  margin: 1em, 0;
  &:hover {
    background-color: rgb(240, 240, 240);
    .game-prev-control {
      visibility: visible;
      font-weight: bold;
      text-decoration: none;
      color: rgb(41, 41, 41);
    }
  }
}
</style>
