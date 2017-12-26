<template>
    <section>
        <time-bar :timeLimit="2500" @done="prevDone"></time-bar>
        <h1 class="display-2">
            {{question.title}}
        </h1>
    </section>
</template>

<script>
import TimeBar from "./TimeBar";
export default {
  data() {
    return {
      question: this.$store.getters.currQuestion
    }
  },
  methods : {
      prevDone(){
          this.$emit('prevDone')
      }
  },
  components: {
    TimeBar
  }
};
</script>

<style lang="scss" scoped>

</style>
