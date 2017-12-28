<template>
    <section>
        <div class="nick" v-if="!isNameSaved">
            <v-form @submit.prevent="saveName">
                <v-text-field label="Your Nickname??" v-model="playerName" :counter="10">
                </v-text-field>
                <v-btn @click="saveName" color="green">Start Playing!</v-btn>
            </v-form>
        </div>
        <div class="invite-details">
          <h2>Invite your friends to this match!</h2>
          <div v-if="gameUrl">
            Send them this link : 
            <input type="text" readonly :value="gameUrl" @click="copyUrl('gameUrl')" ref="gameUrl">
            <p>Or tell them to go to: {{url}} And insert this pin: 
              <input type="text" readonly :value="pin" @click="copyUrl('gamePin')" ref="gamePin">
            </p>
            <p>Or share on whatsapp</p>
            <!-- show this only on mobile phone -->
            <a :href="`whatsapp://send?text=${gameUrl}`" class="mobile">Share on whatsapp</a>

            <span v-if="isCopied">Copied to clipboard!</span>            
          </div>
        </div>
        <ul>
          <li v-for="player in players" :key="player.userId">{{player.nickname}}</li>
        </ul>
        <button v-if="isHosting">START PLAYING</button>
        <!-- <loading-game @done="showPrev" v-if="!ready"></loading-game>
        <question-prev v-if="questPrev" @prevDone="startGame"></question-prev>
        <quest-comp :question="question" @playNext="playNext" v-if="isQuestionOn" @checkAns="checkAns"></quest-comp>
        <p v-if="!isGameOn">game over</p> -->
    </section>
</template>
<script>
import LoadingGame from "../components/GameComps/LoadingGame";
import QuestionPrev from "../components/GameComps/QuestionPrev";
import GameService from "../services/GamesService";
import QuestComp from "../components/GameComps/QuestComp";
import {
  LOAD_GAME,
  PLAY_NEXT,
  ADD_PLAYER,
  ADD_POINTS,
  RESET_STATE,
  SOCKET_CONNECT,
  SET_MULTI_MATCH
} from "../modules/CurrMultiGameModule";

export default {
  data() {
    return {
      gameUrl: "",
      isCopied: false,
      isJoining: false,
      isNameSaved: false,
      ready: true,
      questPrev: false,
      isQuestionOn: false,
      isGameOn: true,
      playerName: ""
    };
  },
  methods: {
    saveName() {
      // {gameId:this.$route.params.gameId,playerName:this.playerName}
      if (!this.isJoining) {
        this.$socket.emit("SET_MULTI_GAME", {
          gameId: this.$route.params.gameId,
          playerName: this.playerName
        });
      } else {
        this.$socket.emit("JOIN_MATCH", {
          pin: this.$route.params.pinCode,
          playerName: this.playerName
        });
      }
      this.ready = false;
      this.isNameSaved = true;
      console.log(this.playerName);
      // this.$store.dispatch({ type: ADD_PLAYER, playerName: this.playerName });
    },
    showPrev() {
      this.ready = true;
      this.questPrev = true;
    },
    startGame() {
      this.questPrev = false;
      this.isQuestionOn = true;
    },
    playNext() {
      this.isQuestionOn = false;
      this.$store.dispatch({ type: PLAY_NEXT }).then(_ => {
        if (this.$store.getters.currQuestion) this.questPrev = true;
        else this.isGameOn = false;
      });
    },
    checkAns(id, startTime) {
      var points = 0;
      console.log(this.question, "questtionnnnnn");
      if (this.question.answers[id].isCorrect) {
        console.log("correct");
        let time = Date.now() - startTime;
        points = parseInt(
          (this.question.time - time) / this.question.time * 100
        );
      }
      this.$store.dispatch({ type: ADD_POINTS, points });
    },
    copyUrl(el) {
      this.$refs[el].select();
      document.execCommand("Copy"), (this.isCopied = true);
      setTimeout(() => {
        this.isCopied = false;
      }, 1000);
    }
  },
  computed: {
    question() {
      return this.$store.getters.currMultiQuestion;
    },
    players() {
      return this.$store.getters.players;
    },
    isHosting() {
      return true;
    },
    pin() {
      return this.$store.getters.pin;
    },
    url(){
      return window.location.host
    }
  },
  created() {
    console.log(this.$socket);
    if (this.$route.params.pinCode) {
      console.log(this.$route.params.pinCode);
      this.isJoining = true;
    }
    this.$store.dispatch({ type: RESET_STATE }).then(_ => {
      this.$store
        .dispatch({ type: LOAD_GAME, gameId: this.$route.params.gameId })
        .then(_ => {
          console.log(this.question, "from page");
        });
    });
  },
  sockets: {
    connect() {
      console.log("socket connected");
      this.$store.dispatch({ type: SOCKET_CONNECT });
    },
    GAME_CREATED(match) {
      GameService.getShortUrl(match.pin).then(url => (this.gameUrl = url));
      console.log("workingggggg", match);
      this.$store.dispatch({
        type: SET_MULTI_MATCH,
        match,
        socketId: this.$socket.id
      });
    },
    PLAYER_JOINED(match) {
      console.log("joined!!", match);
      this.$store.dispatch({
        type: SET_MULTI_MATCH,
        match,
        socketId: this.$socket.id
      });
    }
  },
  components: {
    LoadingGame,
    QuestionPrev,
    QuestComp
  }
};
</script>

<style lang="scss" scoped>
.nick {
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
