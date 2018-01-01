<template>
    <section v-if="game && gameOwner">
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
                <router-link :to="'/user-profile/' + gameOwner._id">
                <div class="game-owner">
                    <v-avatar size="75px">
                        <img :src="gameOwner.img" :alt="'Photo of '+gameOwner.name">
                    </v-avatar>
                    <p>{{gameOwner.name}}</p>
                </div>
                </router-link>
                <v-card-actions class="game-stats">
                    <div class="rank">
                        <div title="hige-score">
                            <span>{{game.highscore}}</span>
                            <img src="../assets/cup.png"/>
                        </div>
                        <div title="played">
                            <span>{{game.playersCount}}</span>
                            <img src="../assets/played.png"/>
                        </div>
                        <div title="creatd at">
                            <span>{{createdDate}}</span>
                            <img src="../assets/clock.png"/>
                        </div>
                        <div title="questions">
                            <span>{{game.questions.length}}</span>
                            <img src="../assets/question.png"/>
                        </div>
                    </div>
                </v-card-actions>
            </v-card>
            <v-list v-if="game" class="sample-questions" subheader>
                <v-subheader>Sample Questions</v-subheader>
                <div v-for="question in game.questions.slice(0, 3)" v-bind:key="question._id" class="sample-question-item">
                    <v-list-tile>
                        <v-list-tile-content>
                            <v-list-tile-title v-html="question.title"></v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                </div>
            </v-list>
        </div>

        <div class="playBtn">
            <router-link :to="'/'">
                <v-btn fixed bottom left dark color="indigo" value="back">
                    <v-icon>arrow_back</v-icon>
                    <span>Back</span>
                </v-btn>
            </router-link>
        </div>

        <div class="backBtn">
            <v-btn fixed bottom right dark color="indigo" value="play" @click.native.stop="dialog = true">
                <span>play</span>
                <v-icon>play_circle_outline</v-icon>
            </v-btn>
        </div>

        <startgame-modal :dialog="dialog" :game="game"></startgame-modal>

    </section>
</template>
<script>
import GameService from "../services/GamesService";
import UserService from "../services/UserService";
import StartgameModal from "../components/EditCmps/StartGameModal.vue";
import moment from "moment";

export default {
  data() {
    return {
      game: null,
      dialog: false,
      gameOwner: null
    };
  },
  created() {
    var gameId = this.$route.params.gameId;
    GameService.getGameById(gameId).then(game => {
      this.game = game;
      UserService.getUserById(game.ownerId).then(user => {
        this.gameOwner = user;
      });
    });
  },
  components: {
    StartgameModal
  },
  computed: {
    createdDate() {
      return moment(this.game.createdAt).format("l");
    }
  }
};
</script>

<style lang="scss">
.game-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-details-top {
  width: 100%;
  display: flex;
  flex-direction: column;

  .headline {
    font-size: 30px !important;
  }
}

.game-description {
  display: flex;
  justify-content: center;
  text-align: center;
  width: 80%;
  align-self: center;
  font-size: 20px;
}

.sample-question-item {
  transition: all 0.3s;
  &:hover {
    background-color: rgba(175, 175, 175, 0.404);
  }

  .playBtn {
    border-radius: 100px;
    display: flex;
    justify-content: space-between;

    icon {
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

  img{
      width: 15px;
    }
}

.rank {
  display: flex;
  justify-content: center;
  font-size: 1.2em;
  div {
    padding: 15px;

    span {
      padding: 2px;
    }
  }
}

.game-owner {
  display: flex;
  justify-content: center;
  align-items: center;
  p,
  img {
    font-size: 1.4em;
    margin-bottom: 0px;
    padding: 0.5em;
    color: black;
    cursor: pointer;
  }
}
</style>
