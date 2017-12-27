<template>
  <section class="content">
      <h1 v-if="phraseToShow===1" class="display-4" key="start">Starting Game!</h1>
      <h1 v-else-if="phraseToShow===2" class="display-4" key="ready">Ready</h1>
      <h1 v-else-if="phraseToShow===3" class="display-4" key="set">SET</h1>
      <h1 v-else-if="phraseToShow===4" class="display-4" key="go">Go!</h1>
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
    }, 680);
  },

};
</script>

<style lang="scss" scoped>
.content {
    height:85vh;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
}

</style>
