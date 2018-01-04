<template >
    <section v-if="quest && questToEdit">
        <v-list two-line  class="quest-container">
            <v-list-tile :key="quest._id" :class="onEditMode ? 'edit' : ''" >
                <v-list-tile-content>
                    <v-list-tile-title v-html="quest.title" v-if="!onEditMode"></v-list-tile-title>
                    <v-text-field v-if="onEditMode" @input="updateDetails" v-model="questToEdit.title" label="Name"></v-text-field>
                    <v-text-field v-if="onEditMode" @input="updateDetails" v-model="questToEdit.img" label="image"></v-text-field>
                    <div>
                      <v-btn  v-if="onEditMode" @click="deleteQuestion" flat icon small color="teal">
                          <v-icon dark>delete</v-icon>
                      </v-btn>
                      <div class="inline-block show-answers" @click="showAnswer = !showAnswer" v-if="onEditMode">
                        answers
                      <v-btn flat icon small color="teal">
                        <v-icon dark>expand_more</v-icon>
                      </v-btn>
                      </div>
                      <div class="ques-time inline-block" v-if="onEditMode">
                        <button @click="changeTime('+')"  class="inline-block">+</button>
                        {{quest.time / 1000}} Sec
                        <button @click="changeTime('-')" class="minus inline-block">-</button>
                      </div>
                      <div class="inline-block show-answers-non-edit" v-if="!onEditMode"  @click="showAnswer = !showAnswer" >
                        answers
                      <v-btn flat icon small color="teal">
                        <v-icon dark>expand_more</v-icon>
                      </v-btn>
                      </div>
                      <div class="ques-time-non-edit" v-if="!onEditMode">
                        {{quest.time / 1000}} Sec
                      </div>

                    </div>
                </v-list-tile-content>
                    <img v-if="questToEdit.img" :src="questToEdit.img" class="my-quest-img" />
            </v-list-tile>
        </v-list>
        <div @click="showAnswer = true" v-if="showAnswer" v-for="(answer, idx) in questToEdit.answers" :key="idx" class="quest-answers">
            <p v-if="!onEditMode">{{answer.text}}</p>
            <v-text-field v-else v-model="questToEdit.answers[idx].text" label="answer" class="answer-input" @input="updateDetails"></v-text-field>
            <div v-if="!answer.isCorrect" class="notCorrect" @click="changeCorrectAnswer(questToEdit, answer)">
                <label>X</label>
            </div>
            <div v-if="answer.isCorrect" class="isCorrect" @click="changeCorrectAnswer(quest, answer)">
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
    idx: Number,
    fixer: Boolean
  },
  data() {
    return {
      showAnswer: false,
      questToEdit: null
    };
  },
  methods: {
    changeTime(op) {
      if (op === "+") this.quest.time = this.quest.time + 5000;
      else this.quest.time = this.quest.time - 5000;
    },
    changeCorrectAnswer(question, answer) {
      this.showAnswer = !this.showAnswer;
      question.answers.map(answer => (answer.isCorrect = false));
      answer.isCorrect = true;
      this.updateDetails();
    },
    updateDetails() {
      this.$emit("updateDetails", this.idx, this.questToEdit);
    },
    deleteQuestion() {
      this.$emit("deleteQuestion", this.idx);
    }
  },
  watch: {
    fixer: function(_) {
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
  max-width: 150px;
  max-height: 70px;
  margin-right: 1em;
}

li.edit {
  height: 150px;
  :first-child {
    height: 100%;
  }
}

.ques-time {
  border: 1px solid #009688;
  background-color: rgba(255, 255, 255, 0.664);
  color: #009688;
  border-radius: 5px;
  padding: 0 0.3em;
  margin: 6px 0.3em;
  button {
    padding: 0 0.3em;
    &:active,
    &:focus {
      outline: none;
    }
    .minus {
      padding: 0 0.4em;
    }
  }
}

.show-answers {
  border: 1px solid #009688;
  background-color: rgba(255, 255, 255, 0.664);
  color: #009688;
  border-radius: 5px;
  height: 26px;
  display: flex;
  align-items: center;
  padding-left: 0.5em;
  display: inline-block;
  position: absolute;
  right: 10px;

  margin: 6px 0.3em;
  button {
    margin: 0;
  }
}

.show-answers-non-edit {
  border: 1px solid #009688;
  background-color: rgba(255, 255, 255, 0.664);
  color: #009688;
  border-radius: 5px;
  position: absolute;
  height: 26px;
  display: flex;
  align-items: center;
  padding-left: 0.5em;
  right: 70px;
  bottom: -5px;
  margin: 0 0.5em;
  button {
    margin: 0;
  }
}

.ques-time-non-edit {
  position: absolute;
  border: 1px solid #009688;
  background-color: rgba(255, 255, 255, 0.836);
  color: #009688;
  border-radius: 5px;
  height: 26px;
  display: inline-block;
  right: 10px;
  bottom: -5px;
  padding: 0 0.3em;
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
