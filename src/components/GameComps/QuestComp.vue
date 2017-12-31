<template>
  <section v-if="question">
      <time-bar :timeLimit="parseInt(question.time)" @done="playNext"></time-bar>
      <div class="quest-container">
          <div v-if="isCover" class="cover"></div>
          <div class="quest-details">
              <!-- <time-bar :timeLimit="3000" @done="playNext"></time-bar> -->
              <h1>{{question.title}}</h1>
              <div class="content">
                  <div>
                      <img :src="question.img" alt="">
                  </div>
              </div>
              <div class="answersCount">Answers:
                  <br/>{{answerCount}}</div>

          </div>
          <div v-if="!showCorrect" class="answers">
              <v-btn v-for="(answer,idx) in question.answers" :class="isSelected(idx)" :key="idx"
               :color="answerColors[idx]" @click="checkAns($event,idx)"
                  :ref="'ans'+idx">
                  {{answer.text}}
              </v-btn>
          </div>
          <div v-else class="answers">
              <v-btn v-for="(answer,idx) in question.answers" :class="isSelected(idx)" 
              :key="idx" :color="answer.isCorrect ? 'green' : 'red'"
                  :ref="'ans'+idx">
                  {{answer.text}}
              </v-btn>
          </div>
      </div>
  </section>
</template>
<script>
import TimeBar from "./TimeBar";
export default {
  props : {
    question: Object
  },
  data() {
    return {
      selectedAnsId: null,
      showCorrect:false,
      showScoreBoard: false,
      isCover: false,
      startTime: null,
      isAnswer: false,
      answerColors: [
        "light-green accent-3",
        "deep-orange darken-2",
        "yellow lighten-2",
        "purple accent-3"
      ]
    };
  },
  methods: {
    checkAns($event, id) {
      if (this.isAnswer) return;
      else {
      this.$emit('checkAns',id,this.startTime)
        this.isAnswer = true;
        this.isCover= true;
        this.selectedAnsId = id;
      }
    },
    isSelected(id) {
      return { "selected-ans": id === this.selectedAnsId };
    },
    playNext() {
      this.isCover = true;
      this.showCorrect = true;
      setTimeout(()=>{
        this.$emit("playNext");
      },2500)
    }
  },
  computed: {
    answerCount() {
      return this.$store.getters.answersCount
    }
  },
  mounted() {
    this.startTime = Date.now();
  },
  components: {
    TimeBar
  }
};
</script>
<style lang="scss" scoped>
.selected-ans {
  z-index: 4;
}
.cover {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.445);
  z-index: 3;
}
.quest-container {
  display: flex;
  height: 85vh;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .quest-details {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .answersCount {
      text-align: center;
      h1 {
        font-size: 1.2em;
      }
    }
    .content {
      display: flex;
      align-items: center;
      img {
        max-width: 180px;
        height: auto;
        margin-right: 20px;
      }
    }
  }
  .answers {
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    button {
      height: 100px;
      border-radius: 8px;
      width: 45%;
    }
  }
}
</style>
