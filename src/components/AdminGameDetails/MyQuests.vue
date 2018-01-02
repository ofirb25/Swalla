<template>
  <section v-if="game" class="my-quests-container">
        <h1 v-if="!onEditMode">Questions ({{game.questions.length}})</h1>
        <v-btn v-if="onEditMode" dark color="teal" value="save" @click="saveGame">
            <span>Save</span>
            <v-icon>check_circle</v-icon>
        </v-btn>
        <v-btn v-if="onEditMode" dark color="teal" value="cancel" @click="cancelEdit1">
            <span>Cancel</span>
            <v-icon>cancel</v-icon>
        </v-btn>
        <my-quest-preview  v-for="(quest, idx) in gameToEdit.questions" :key="idx" :quest="quest"
        :idx="idx" :onEditMode="onEditMode"></my-quest-preview>
  </section>
</template>
<script>
import MyQuestPreview from "./MyQuestPreview";
export default {
  props: {
    game: Object,
    onEditMode: Boolean
  },
  components: {
    MyQuestPreview
  },
  data() {
    return {
      gameToEdit: null
    };
  },
  watch: {
    game: function(_) {
      this.gameToEdit = JSON.parse(JSON.stringify(this.game));
    }
  },
  created() {
    this.gameToEdit = JSON.parse(JSON.stringify(this.game));
  },
  methods: {
    updateDetails(quest, idx) {
      this.gameToEdit.questions[idx] = quest;
      this.$emit("updateDetails", this.gameToEdit);
    },
    saveGame() {
      this.$emit('saveGame')
    },
    cancelEdit1() {
      console.log('**')
      this.$emit('cancelEdit')
    }
  }
};
</script>
<style lang="scss" scoped>
.my-quests-container {
  width: 85%;
  margin-top: 1em;
  h1 {
    color: rgb(97, 97, 97);
  }
  button {
    margin: 1em 1em 1em 0;
    
    span {
      margin-right: 0.5em;
    }
  }
}
</style>

