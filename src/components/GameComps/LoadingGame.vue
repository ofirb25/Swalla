<template>
  <section>
      <h1 v-if="phraseToShow===1" class="display-4">Starting Game!</h1>
      <h1 v-if="phraseToShow===2" class="display-4">Ready</h1>
      <h1 v-if="phraseToShow===3" class="display-4">SET</h1>
      <h1 v-if="phraseToShow===4" class="display-4">Go!</h1>
  </section>
</template>

<script>
import readyAudio from "../../assets/game-start.mp3";
export default {
  data() {
    return {
      phraseToShow: 1
    };
  },
  created() {
    // var sound = new Audio(readyAudio)
    // sound.play();
    var interval = setInterval(() => {
      this.phraseToShow++;
      if (this.phraseToShow >= 5) {
        clearInterval(interval);
        this.$emit('done');
      }
    }, 750);
  },

};
</script>

<style lang="scss" scoped>

</style>
