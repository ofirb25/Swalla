<template>
  <section>
    <div class="nick" v-if="!isNameSaved">
    <v-form  @submit.prevent="saveName">
     <v-text-field
      label="Your Nickname??"
      v-model="playerName"
      :counter="10">
      </v-text-field>
        <v-btn @click="saveName" color="green">Start playing!</v-btn>
      </v-form>
    </div>
  
   
      <loading-game @done="showPrev" v-if="!ready"></loading-game>
      <question-prev v-if="questPrev" @prevDone="startGame"></question-prev>
      <quest-comp :question="question" @playNext="playNext" v-if="isQuestionOn" @checkAns="checkAns"></quest-comp>
      <p v-if="!isGameOn">game over</p>
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
  RESET_STATE
} from "../modules/CurrGameModule";

export default {
  data() {
    return {
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
      this.ready = false;
      this.isNameSaved = true;
      console.log(this.playerName);
      this.$store.dispatch({ type: ADD_PLAYER, playerName: this.playerName });
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
    }
  },
  computed: {
    question() {
      return this.$store.getters.currQuestion;
    }
  },
  created() {
    this.$store.dispatch({ type: RESET_STATE }).then(_ => {
      this.$store
        .dispatch({ type: LOAD_GAME, gameId: this.$route.params.gameId })
        .then(_ => {
          console.log(this.question, "from page");
        });
    });
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
