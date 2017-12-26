<template>
    <v-list two-line class="my-game-prev">
        <v-list-tile avatar :key="game._id">
            <img :src="game.img" class="my-game-img"/>
            <v-list-tile-content>
                <div>
                    <p @click.prevent="deleteGame(game._id)" class="game-prev-control">Delete</p>
                    <router-link><p class="game-prev-control">Edit</p></router-link>
                </div>
                <v-list-tile-title v-html="game.name"></v-list-tile-title>
                <v-list-tile-sub-title v-html="'temp: '+game.createdAt"></v-list-tile-sub-title>
                <v-list-tile-sub-title v-html="'questions:' + game.questions.length"></v-list-tile-sub-title>
            </v-list-tile-content>
                <div>
                    <v-btn flat color="teal" value="play">
                        <span>play</span>
                        <v-icon>play_circle_outline</v-icon>
                    </v-btn>
                </div>
                <div>
                    <v-btn flat color="teal" value="share">
                        <span>share</span>
                        <v-icon>share</v-icon>
                    </v-btn>
                </div>
       </v-list-tile>
    </v-list>
</template>
<script>
import { LOAD_GAMES, DELETE_GAME } from "../../modules/GamesModule";

export default {
  props: {
    game: Object
  },
  methods: {
    deleteGame(gameId) {
      this.$store.dispatch({ type: DELETE_GAME, gameId })
    }
  }
};
</script>
<style lang="scss" scoped>
.my-game-img {
  width: 100px;
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

.my-game-prev:hover {
  background-color: rgb(240, 240, 240);
  cursor: pointer;
  .game-prev-control {
    visibility: visible;
    font-weight: bold;
  }
}
</style>
