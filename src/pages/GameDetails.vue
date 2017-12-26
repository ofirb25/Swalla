<template>
  <section v-if="game">
      <div class="game-details">

      <v-card class="game-details-top">
        <v-card-media :src="game.img" height="200px">
        </v-card-media>
        <v-card-title class="game-description" primary-title>
          <div>
            <h3 class="headline mb-0">{{game.name}}</h3>
            <div>{{game.description}}</div>
          </div>
        </v-card-title>
        <v-card-actions class="game-stats">
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
        </v-card-actions>
      </v-card>
     
        <v-list class="sample-questions" subheader>
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
        </div>

      <v-fab-transition>
        <v-btn
        :color="activeFab.color"
        :key="activeFab.icon"
        dark
        fab
        fixed
        bottom
        right
        v-model="fab"
      >
        <v-icon>{{ activeFab.icon }}</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      </v-fab-transition>
  </section>
</template>
<script>
import GameService from "../services/GamesService";
export default {
  data() {
    return {
      game: null,
       fab: false,
      hidden: false,
      tabs: null
    };
  },
  created() {
    var gameId = this.$route.params.gameId;
    GameService.getGameById(gameId).then(game => {
      this.game = game;
    });
  },
   computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { 'color': 'indigo', icon: 'share' }
          case 'two': return { 'color': 'red', icon: 'edit' }
          case 'three': return { 'color': 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      }
    }
  }

</script>

<style lang="scss">
.game-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-details-top{
  width: 100%;
}

.game-description{
  display: flex;
  justify-content: center;
  text-align: center;
}

.sample-question-item {
    transition: all 0.3s;
    &:hover{
        background:plum;
    }
}

.sample-questions{
  width: 100%;
}

.game-stats{
  display: flex;
  justify-content: center;
}

.rank {
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  div {
    padding: 15px;

    span {
      padding: 5px;
    }
  }
}
</style>