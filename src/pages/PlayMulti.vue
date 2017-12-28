<template>
    <section class="wrapper">
        <submit-name @saveName="saveName" v-if="!isNameSaved"></submit-name>
        <div class="waiting-comps">
     <invite-details :pin="pin" :gameUrl="gameUrl" :url="url" v-if="match && isHosting"></invite-details>
        <players-list v-if="match" :players="players"></players-list>
           
        </div>
           <v-btn @click="startGame" block v-if="isHosting && gameUrl"  color="white" value="Begin Game" class="start-game">
            <span>Begin Game</span>
        </v-btn>
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
import PlayersList from "../components/GameComps/PlayersList";
import InviteDetails from "../components/GameComps/InviteDetails";
import SubmitName from "../components/GameComps/SubmitName";
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
    saveName(playerName) {
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
      this.ready = false;
      this.isNameSaved = true;
      console.log(playerName);
      // this.$store.dispatch({ type: ADD_PLAYER, playerName: this.playerName });
    },
    showPrev() {
      this.ready = true;
      this.questPrev = true;
    },
    startGame() {
      this.$socket.emit('GAME_STARTED',{pin: this.pin})
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
      return this.$store.getters.players;
    },
    isHosting() {
      return this.$store.getters.isHosting;
    },
    pin() {
      return this.$store.getters.pin;
    },
    url() {
      return window.location.host;
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
    QuestComp,
    PlayersList,
    InviteDetails,
    SubmitName
  }
};
</script>

<style lang="scss" scoped>
.waiting-comps {
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.wrapper {
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: Gradient 15s ease infinite;
}

@-webkit-keyframes Gradient {
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

@-moz-keyframes Gradient {
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
