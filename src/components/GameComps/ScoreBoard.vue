<template>
    <div>
    <h1 class="display-2">Score Board</h1>
    <div class="userScore" v-for="player in players">
    {{player.name}} -
    {{player.points}}
    </div>
    </div>
</template>
<script>
export default {
  computed: {
      scores() {
        return this.$store.getters.currGameScores
      },

  }
};
</script>