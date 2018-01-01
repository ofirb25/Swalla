<template>
  <section v-if="game" class="my-quests-container">
        <h1>Questions {{game.questions.length}}</h1>
        <my-quest-preview v-for="quest in game.questions" :key="quest._id" :quest="quest"></my-quest-preview>
  </section>
</template>
<script>
import MyQuestPreview from './MyQuestPreview'
export default {
  props: {
    game: Object
  },
  components: {
    MyQuestPreview
  }
};
</script>
<style lang="scss" scoped>
  .my-quests-container {
    width: 85%;
    margin-top: 1em;
  h1 {
    color: rgb(97, 97, 97)
  }
  }
</style>

