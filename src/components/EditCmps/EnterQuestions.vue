<template>
    <section v-if="gameQuestions">
        <div v-for="(question, idx) in gameToEdit.questions" avatar :key="idx" class="question-container">
            <v-list two-line class="my-game-prev">
              <div><v-text-field label="question" v-model="question.title" required></v-text-field></div>
                <v-list-tile avatar :key="question._id">
                    <img v-if="question.img" :src="question.img" class="my-game-img" />
                    <v-text-field label="image" v-model="question.img" required></v-text-field>
                    <div>
                        <v-btn flat color="teal" value="edit" @click="showAnswer(question)">
                            <span>Edit answers</span>
                            <v-icon>edit</v-icon>
                        </v-btn>
                    </div>
                    <div>
                        <v-btn flat color="teal" value="delete" @click="deleteQuestion(idx)">
                            <span>Delete</span>
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </div>
                </v-list-tile>
            </v-list>
            <div v-if="question.showAnswer" v-for="answer in question.answers" :key="answer._id" class="quest-answers">
                <v-text-field v-model="answer.text" required class="answer-text"></v-text-field>
                <div v-if="!answer.isCorrect" class="notCorrect" @click="changeCorrectAnswer(question, answer)">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </div>
                <div v-if="answer.isCorrect" class="isCorrect" @click="changeCorrectAnswer(question, answer)">
                    <i class="fa fa-check" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        <v-btn @click="addQuestion">
            <v-icon>add</v-icon>
        </v-btn>
        <v-btn @click="cancleClicked">Cancle</v-btn>
        <v-btn @click="saveClicked">Save</v-btn>
    </section>
</template>
<script>
import Vue from "vue";
import GameService from '../../services/GamesService'

export default {
  data() {
    return {
      gameToEdit: null
    };
  },
  methods: {
    cancleClicked() {
      this.$router.push("/my-games");
      this.$emit("cancleEdition");
    },
    saveClicked() {
      this.$emit("save", this.gameToEdit);
    },
    showAnswer(question) {
      if (!question.showAnswer) {
        Vue.set(question, "showAnswer", true);
      } else question.showAnswer = !question.showAnswer;
    },
    deleteQuestion(questionIdx) {
      this.gameToEdit.questions.splice(questionIdx, 1);
    },
    addQuestion() {
        let question = GameService.getEmptyQuestion()
        this.gameToEdit.questions.push(question)
    },
    changeCorrectAnswer(question, answer) {
        question.answers.map(answer => answer.isCorrect = false)
        answer.isCorrect = true
    }
  },
  created() {
    this.gameToEdit = JSON.parse(JSON.stringify(this.gameQuestions));
  },
  props: ["gameQuestions"]
};
</script>

<style lang="scss" scoped>
.question-container {
    margin: 1em 0;
}

.my-game-img {
  max-width: 200px;
  max-height: 100px;
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
    text-decoration: none;
    color: rgb(41, 41, 41);
  }
}

.quest-answers {
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-top: 1.2px solid rgb(238, 237, 237);
  padding: 10px 16px;
  div {
    display: inline-block;
    margin: 0px;
    max-width: 80%;
    max-height: 42px;
  }
  .notCorrect {
    color: red;
    font-size: 1.2em;
    cursor: pointer;
  }
  .isCorrect {
    color: green;
    font-size: 1.2em;
    cursor: pointer;
  }
}

</style>
