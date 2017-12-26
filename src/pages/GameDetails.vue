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
              <span>{{game.highscore}}</span>
              <span class="fa fa-trophy"></span>
            </div>
            <div>
              <span>{{game.playersCount}}</span>
              <span class="fa fa-users"></span>
            </div>
            <div>
              <span>{{game.createdAt}}</span>
              <span class="fa fa-clock-o"></span>
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
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-html="question.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </div>
      </v-list>
    </div>

    <!-- <v-btn  fixed dark bottom right color="indigo">play</v-btn> -->

    <div class="playBtn">
      <v-btn fixed bottom right dark color="indigo" value="play" @click.native.stop="dialog = true">
        <span>play</span>
        <v-icon>play_circle_outline</v-icon>
      </v-btn>
    </div>

     <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Choose game style:</v-card-title>
        <v-card-text class="modal-content">
          <router-link tag="div" :to="'/game/'+ game._id+'/play'">
          <div>
            <img src="../assets/single-player.png">
            <h4>Single player</h4>
          </div>
          </router-link>
          <h1>or</h1>
          <div>
            <img src="../assets/multiple-users.png">
             <h4>Invite players</h4>
          </div>
          </v-card-text>
        
      </v-card>
    </v-dialog>


  </section>
</template>
<script>
  import GameService from "../services/GamesService";
  export default {
    data() {
      return {
        game: null,
        dialog: false
      };
    },
    created() {
      var gameId = this.$route.params.gameId;
      GameService.getGameById(gameId).then(game => {
        this.game = game;
      });
    }
  }

</script>

<style lang="scss">
  .game-details {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .game-details-top {
    width: 100%;
  }

  .game-description {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  .sample-question-item {
    transition: all 0.3s;
    &:hover {
      background: plum;
    }

    .playBtn {
      border-radius: 100px;
      display: flex;
      justify-content: space-between;
      
      

      icon{
         margin: 10px; 
      }
    }
  }

  .sample-questions {
    width: 100%;
  }

  .game-stats {
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

  .modal-content{
    display: flex;
    justify-content: space-around;
    align-items: center;

    div{
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
    }
  }

</style>
