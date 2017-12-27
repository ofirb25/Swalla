<template>
  <section>
    <div class="nick" v-if="!isNameSaved">
    <v-form  @submit.prevent="saveName">
     <v-text-field
      label="Your Nickname??"
      v-model="name"
      :counter="10">
      </v-text-field>
        <v-btn @click="saveName" color="green">Start Playing!</v-btn>
      </v-form>
    </div>
  
   
      <loading-game @done="showPrev" v-if="!ready"></loading-game>
      <question-prev v-if="questPrev" @prevDone="startGame"></question-prev>
      <quest-comp @playNext="playNext" v-if="isQuestionOn"></quest-comp>
      <p v-if="!isGameOn">game over</p>
  </section>
</template>

<script>
import LoadingGame from "../components/GameComps/LoadingGame";
import QuestionPrev from "../components/GameComps/QuestionPrev";
import GameService from "../services/GamesService";
import QuestComp from "../components/GameComps/QuestComp";
import { LOAD_GAME, PLAY_NEXT } from "../modules/CurrGameModule";

export default {
  data() {
    return {
      isNameSaved : false,
      ready: true,
      questPrev: false,
      isQuestionOn: false,
      isGameOn: true,
      name: ''
      
    };
  },
  methods: {
    saveName() {
      this.ready = false;
      this.isNameSaved = true;
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
    }
  },
  created() {
    this.$store
      .dispatch({ type: LOAD_GAME, gameId: this.$route.params.gameId })
      .then(_ => {
        // this.ready = false;
        //remove to fix
        // this.isQuestionOn = true;
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
  height:90vh;
  display: flex;
  flex-direction: column;
  align-items:center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
