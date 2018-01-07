<template>
    <section class="wrapper">
        <submit-name @saveName="saveName" v-if="!isNameSaved"></submit-name>
          <!-- <div class="waiting-wraper" v-if="isRoomReady && isNameSaved &&isMultiGame"> -->
          <!-- <h1>Join at <span> swalla.herokuapp.com </span> with Game PIN: <span>{{pin}}</span></h1> -->
        <div v-if="isRoomReady && isNameSaved &&isMultiGame" class="waiting-comps">
          <invite-details :pin="pin" :gameUrl="gameUrl" :url="url" v-if="match && isHosting" @startGame="startGame"></invite-details>
          <players-list v-if="match" :players="players"></players-list>
        <!-- </div> -->
        </div>
        <loading-game @done="showPrev" v-if="ready"></loading-game>
        <question-prev :question="question" v-if="questPrev"></question-prev>
        <quest-comp :question="question" v-if="isQuestionOn" @checkAns="checkAns"></quest-comp>
        <section  v-if="isScoreBoard">
          <score-board :players="players" :isGameOn="isGameOn" :playerName="playerName"></score-board>
        </section>
    </section>
</template>
<script>
import LoadingGame from "../components/GameComps/LoadingGame";
import QuestionPrev from "../components/GameComps/QuestionPrev";
import GameService from "../services/GamesService";
import QuestComp from "../components/GameComps/QuestComp";
import PlayersList from "../components/GameComps/PlayersList";
import InviteDetails from "../components/GameComps/InviteDetails";
import SubmitName from "../components/GameComps/SubmitName";
import ScoreBoard from "../components/GameComps/ScoreBoard";
import {
  LOAD_GAME,
  PLAY_NEXT,
  ADD_PLAYER,
  ADD_POINTS,
  RESET_STATE,
  SOCKET_CONNECT,
  SET_MULTI_MATCH,
  INCREMENT_ANSWERS_COUNT
} from "../modules/CurrMultiGameModule";
import { UPDATE_USER, UPDATE_USER_ANS_COUNT } from "../modules/UserModule";
import answerAudio from "../assets/answer.mp3";
import gameOverAudio from "../assets/gameOver.mp3";

export default {
  data() {
    return {
      gameUrl: "",
      isJoining: false,
      isRoomReady: true,
      isNameSaved: false,
      ready: false,
      questPrev: false,
      isQuestionOn: false,
      isGameOn: false,
      isGameOver: false,
      isScoreBoard: false,
      playerName: ""
    };
  },
  methods: {
    saveName(playerName) {
      this.playerName = playerName;
      // {gameId:this.$route.params.gameId,playerName:this.playerName}
      if (!this.isJoining) {
        this.$socket.emit("SET_MULTI_GAME", {
          gameId: this.$route.params.gameId,
          playerName: playerName
        });
      } else {
        this.$socket.emit("JOIN_MATCH", {
          pin: this.$route.params.pinCode,
          playerName: playerName
        });
      }
      this.isNameSaved = true;
    },
    showPrev() {
      this.$socket.emit("SHOW_PREV", { pin: this.pin });
    },
    showQuestion() {
      this.$socket.emit("QUESTION_STARTED", {
        time: this.question.time,
        pin: this.pin
      });
    },
    startGame() {
      this.$socket.emit("START_GAME", { pin: this.pin });
    },
    checkAns(id, startTime) {
      var points = 0;
      if (this.question.answers[id].isCorrect) {
        let time = Date.now() - startTime;
        points = parseInt(
          (this.question.time - time) / this.question.time * 100
        );
        this.$store.dispatch({ type: UPDATE_USER_ANS_COUNT, isCorrect: true });
      } else {
        this.$store.dispatch({ type: UPDATE_USER_ANS_COUNT, isCorrect: false });
      }

      this.$socket.emit("PLAYER_ANSWERED", { points, pin: this.pin });
    },
    showScores() {
      this.$socket.emit("SHOW_SCORES", { pin: this.pin });
    },
    updeteUser() {
      this.$store.dispatch({
        type: UPDATE_USER,
        isMultiGame: this.isMultiGame
      });
    }
  },
  computed: {
    match() {
      return this.$store.getters.match;
    },
    question() {
      return this.$store.getters.currMultiQuestion;
    },
    players() {
      return this.$store.getters.multiPlayers;
    },
    isHosting() {
      return this.$store.getters.isHosting;
    },
    pin() {
      return this.$store.getters.pin;
    },
    url() {
      return window.location.host;
    },
    isMultiGame() {
      return this.$route.params.gameType === "play-multi";
    }
  },
  created() {
    if (this.$route.params.pinCode) {
      this.isJoining = true;
    }
    this.$store.dispatch({ type: RESET_STATE }).then(_ => {
      this.$store
        .dispatch({ type: LOAD_GAME, gameId: this.$route.params.gameId })
        .then(_ => {
          console.log(this.question, "from page");
        });
    });
    this.updeteUser();
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
      if (!this.isMultiGame) {
        this.startGame();
      }
    },
    PREV_DONE(match) {
      console.log(this.isScoreBoard);
      this.showQuestion();
    },
    PLAYER_JOINED(match) {
      console.log("joined!!", match);
      this.$store.dispatch({
        type: SET_MULTI_MATCH,
        match,
        socketId: this.$socket.id
      });
    },
    START_GAME(match) {
      console.log("match started", match);
      this.$store.dispatch({
        type: SET_MULTI_MATCH,
        match,
        socketId: this.$socket.id
      });
      this.ready = true;
      this.isRoomReady = false;
    },
    SHOW_PREV() {
      this.isScoreBoard = false;
      console.log(this.isScoreBoard);
      this.ready = false;
      this.isGameOn = true;
      this.questPrev = true;
    },
    QUESTION_STARTED() {
      this.questPrev = false;
      this.isQuestionOn = true;
    },
    TIME_UP() {
      this.isQuestionOn = false;
      this.isScoreBoard = true;
      this.showScores();
    },
    PLAYER_ANSWERED({ players, answersCount }) {
      let sound = new Audio(answerAudio);
      sound.play();
      this.$store.dispatch({ type: ADD_POINTS, players, answersCount });
    },
    NEXT_QUESTION() {
      this.isScoreBoard = false;
      this.$store.dispatch({ type: PLAY_NEXT }).then(_ => {
        console.log(this.$store.getters.currMultiQuestion);
        if (
          this.$store.getters.currMultiQuestion ||
          this.$store.getters.currMultiQuestion === 0
        ) {
          this.showPrev();
          this.questPrev = true;
        } else {
          this.isGameOn = false;
          // this.isQuestionOn = true;
          this.isScoreBoard = true;
          console.log("sending game over");
          this.$socket.emit("GAME_OVER", { pin: this.pin });
          let gameOverSound = new Audio(gameOverAudio);
          gameOverSound.play();
        }
      });
      console.log(this.isScoreBoard);
    },
    GAME_OVER() {
      console.log("game over from server");
      this.isScoreBoard = true;
      this.isGameOn = false;
    }
  },
  components: {
    LoadingGame,
    QuestionPrev,
    QuestComp,
    PlayersList,
    InviteDetails,
    SubmitName,
    ScoreBoard
  }
};
</script>

<style lang="scss" scoped>
.waiting-wraper {
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 3em;
    font-weight: normal;
    align-self: center;
    margin-top: 20px;
    color: rgba(255, 255, 255, 0.836);
    span {
      font-weight: bold;
      font-size: 1.1em;
      color: rgb(255, 255, 255);
    }
  }
}
.waiting-comps {
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
@media screen and (max-width: 800px) {
  .waiting-comps {
    flex-direction: column;
    * {
      margin: 10px 0;

      flex: 1;
    }
  }
}
.wrapper {
  height: 100%;
  color: #fff;
  margin-top: 10px;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
