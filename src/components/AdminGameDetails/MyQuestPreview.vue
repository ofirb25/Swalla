<template >
    <section>
        <v-list two-line v-if="quest" class="quest-container">
            <v-list-tile :key="quest._id" :class="onEditMode ? 'edit' : ''"  @click="showAnswer = !showAnswer">
                <v-list-tile-content>
                    <v-list-tile-title v-html="quest.title" v-if="!onEditMode"></v-list-tile-title>
                    <v-text-field v-if="onEditMode" @input="updateDetails" v-model="quest.title" label="Name"></v-text-field>
                    <v-text-field v-if="onEditMode" @input="updateDetails" v-model="quest.img" label="image"></v-text-field>
                </v-list-tile-content>
                <div>
                    <img :src="quest.img" class="my-quest-img" />
                    <div class="ques-time">
                      <button @click="changeTime('+')" v-if="onEditMode">+</button>
                       {{quest.time / 1000}} sec
                      <button @click="changeTime('-')" v-if="onEditMode" class="minus">-</button>
                    </div>
                </div>
            </v-list-tile>
        </v-list>
        <div @click="showAnswer = true" v-if="showAnswer" v-for="(answer, idx) in questToEdit.answers" :key="idx" class="quest-answers">
            <p v-if="!onEditMode">{{answer.text}}</p>
            <v-text-field v-else v-model="answer.text" label="answer" class="answer-input"></v-text-field>
            <div v-if="!answer.isCorrect" class="notCorrect" @click="changeCorrectAnswer(questToEdit, answer)">
                <!-- <i class="fa fa-times" aria-hidden="true"></i> -->
                <label>X</label>
            </div>
            <div v-if="answer.isCorrect" class="isCorrect" @click="changeCorrectAnswer(quest, answer)">
                <!-- <i class="fa fa-check" aria-hidden="true"></i> -->
                <i class="material-icons">check</i>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  props: {
    quest: Object,
    onEditMode: Boolean,
    idx: Number
  },
  data() {
    return {
      showAnswer: false,
      questToEdit: null
    };
  },
  methods: {
    changeTime(op) {
      this.showAnswer = !this.showAnswer;
      if (op === "+") this.quest.time = this.quest.time + 5000;
      else this.quest.time = this.quest.time - 5000;
    },
    changeCorrectAnswer(question, answer) {
      this.showAnswer = !this.showAnswer;
      question.answers.map(answer => (answer.isCorrect = false));
      answer.isCorrect = true;
      this.updateDetails()
    },
    updateDetails() {
      this.$emit("updateDetails", this.idx, this.questToEdit);
    },

  },
  watch: {
    quest: function(_) {
      this.questToEdit = JSON.parse(JSON.stringify(this.quest));
    }
  },
  created() {
    this.questToEdit = JSON.parse(JSON.stringify(this.quest));
  }
};
</script>
<style lang="scss" scoped>
.my-quest-img {
  max-width: 200px;
  max-height: 100px;
  margin-right: 1em;
}
.quest-prev-control {
  margin: 0;
  font-size: 12px;
  display: inline-block;
  visibility: hidden;
}
.list__tile__sub-title {
  font-size: 0.8em;
}

li.edit {
  height: 150px;
  :first-child {
    height: 100%;
  }
}
.ques-time {
  background-color: rgba(0, 0, 0, 0.589);
  color: white;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  bottom: -5px;
  padding: 0.1em 0.3em;
  .minus {
    padding: 0 0.3em;
  }
  button{
    &:active, &:focus {
      outline: none
    }
  }
}
.quest-answers {
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-top: 1.2px solid rgb(238, 237, 237);
  padding: 10px 16px;
  .answer-input {
    width: 80%;
  }
  p,
  div {
    display: inline-block;
    margin: 0px;
  }
  .notCorrect {
    color: red;
    font-size: 1.2em;
    font-weight: bold;
    label {
    cursor: pointer;
    }
  }
  .isCorrect {
    color: green;
    font-size: 1.2em;
    cursor: pointer;
  }
}
.quest-container {
  cursor: pointer;
  margin-top: 1em;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
}
</style>
