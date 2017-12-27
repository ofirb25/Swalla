<template >
    <section  @click="showAnswer = !showAnswer">
        <v-list two-line v-if="quest" class="quest-container">
            <v-list-tile :key="quest._id">
                <v-list-tile-content>
                    <v-list-tile-title v-html="quest.title"></v-list-tile-title>
                </v-list-tile-content>
                <div>
                    <img :src="quest.img" class="my-game-img" />
                    <div class="ques-time">
                        {{quest.time / 1000}} sec
                    </div>
                </div>
            </v-list-tile>
        </v-list>
        <div v-if="showAnswer" v-for="answer in quest.answers" :key="answer.text" class="quest-answers">
            <p>{{answer.text}}</p>
            <div v-if="!answer.isCorrect" class="notCorrect">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>
            <div v-if="answer.isCorrect" class="isCorrect">
                <i class="fa fa-check" aria-hidden="true"></i>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  props: {
    quest: Object
  },
  data() {
    return {
      showAnswer: false
    };
  }
};
</script>
<style lang="scss" scoped>
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
.ques-time {
  background-color: rgba(0, 0, 0, 0.589);
  color: white;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  bottom: 0px;
}
.quest-answers {
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-top: 1.2px solid rgb(238, 237, 237);
  padding: 10px 16px;
  p,
  div {
    display: inline-block;
    margin: 0px;
  }
  .notCorrect {
    color: red;
    font-size: 1.2em;
  }
  .isCorrect {
    color: green;
    font-size: 1.2em;
  }
}
.quest-container {
  cursor: pointer;
  margin: 1em;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
}
</style>
