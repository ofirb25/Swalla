<template>
    <section v-if="gameQuestions">
        <v-list two-line class="my-game-prev quest-container">
            <v-list-tile v-for="(question, idx) in gameToEdit.questions" avatar :key="idx">
                <img :src="question.img" class="my-game-img" />
                <v-list-tile-content>
                    <v-list-tile-title v-html="question.title"></v-list-tile-title>
                </v-list-tile-content>
                <div>
                    <v-btn @click="showAnswer = !showAnswer" flat color="teal" value="edit">
                        <span>Edit</span>
                        <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn flat color="teal" value="delete">
                        <span>Delete</span>
                        <v-icon>delete</v-icon>
                    </v-btn>
                </div>
                <div v-if="showAnswer" v-for="(answer, idx) in question.answers" :key="idx" class="quest-answers">
                    <p>{{answer.text}}</p>
                    <div v-if="!answer.isCorrect" class="notCorrect">
                        <i class="fa fa-times" aria-hidden="true"></i>
                    </div>
                    <div v-if="answer.isCorrect" class="isCorrect">
                        <i class="fa fa-check" aria-hidden="true"></i>
                    </div>
                </div>
            </v-list-tile>
        </v-list>
        <v-btn>
            <v-icon>add</v-icon>
        </v-btn>
        <v-btn @click="cancleClicked">Cancle</v-btn>
        <v-btn @click="saveClicked">Save</v-btn>
    </section>
</template>
<script>
export default {
  data() {
    return {
      showAnswer: false,
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
    }
  },
  created() {
    this.gameToEdit = JSON.parse(JSON.stringify(this.gameQuestions));
  },
  props: ["gameQuestions"]
};
</script>

<style lang="scss" scoped>
.my-game-img {
  width: 100px;
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
</style>
