<template>
  <section v-if="game">
      <div class="game-details">
          <h1>{{game.name}}</h1>
      <img :src="game.img">
      <p>{{game.description}}</p>
      </div>

      <div class="rank">
          <div>
            <span class="fa fa-trophy"></span><span>{{game.highscore}}</span>
          </div>
           <div>
            <span>{{game.playersCount}}</span><span class="fa fa-users"></span>
           </div>
           <div>
            <span>{{game.createdAt}}</span><span class="fa fa-clock-o"></span>
           </div>
      </div>
        <v-list subheader>
          <v-subheader>Sample Questions</v-subheader>
                   <!-- <v-list-tile v-for="question in game.questions" v-bind:key="question._id">
              <v-list-tile-content>
                <v-list-tile-title v-html="question.title" ></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider> -->
          <div v-for="question in game.questions" v-bind:key="question._id" class="sample-question-item">
            <v-list-tile >
              <v-list-tile-content>
                <v-list-tile-title v-html="question.title" ></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider></v-divider>
          </div>
        </v-list>
  </section>
</template>
<script>
import GameService from "../services/GamesService";
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
  }
};
</script>

<style lang="scss">
.game-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sample-question-item {
    transition: all 0.3s;
    &:hover{
        background:plum;
    }
}

.rank {
  display: flex;
  justify-content: center;
  font-size: 2em;
  div {
    padding: 15px;

    span {
      padding: 5px;
    }
  }
}
</style>