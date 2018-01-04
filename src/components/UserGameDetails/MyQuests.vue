<template>
    <section v-if="readyToAdd || game " class="my-quests-container">
        <h1 v-if="!onEditMode">Questions ({{game.questions.length}})</h1>
        <v-btn v-if="onEditMode" dark color="teal" value="save" @click="saveGame">
            <span>Save</span>
            <v-icon>check_circle</v-icon>
        </v-btn>
        <v-btn v-if="onEditMode" dark color="teal" value="cancel" @click="cancelEdit1">
            <span>Cancel</span>
            <v-icon>cancel</v-icon>
        </v-btn>
        <my-quest-preview @updateDetails="updateDetails" v-for="(quest, idx) in editableGame.questions" :key="idx" :quest="quest"
            :idx="idx" :onEditMode="onEditMode" :fixer="fixer" @deleteQuestion="deleteQuestion"></my-quest-preview>
        <v-btn v-if="onEditMode" @click="addQuestion" color="teal" dark small fab>
            <v-icon>add</v-icon>
        </v-btn>
    </section>
</template>
<script>
import MyQuestPreview from "./MyQuestPreview";
import GameService from "../../services/GamesService";
export default {
  props: {
    game: Object,
    onEditMode: Boolean,
    editableGame: Object,
    fixer: Boolean
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
    fixer: function(_) {
      this.gameToEdit = JSON.parse(JSON.stringify(this.editableGame));
    }
  },
  created() {
    this.gameToEdit = JSON.parse(JSON.stringify(this.editableGame));
  },
  methods: {
    updateDetails(idx, quest) {
      this.gameToEdit.questions[idx] = quest;
      this.$emit("updateDetails", this.gameToEdit);
    },
    saveGame() {
      this.$emit("saveGame");
    },
    cancelEdit1() {
      this.$emit("cancelEdit");
    },
    addQuestion() {
      let question = GameService.getEmptyQuestion();
      this.gameToEdit.questions.push(question);
      this.$emit("updateDetails", this.gameToEdit);
    },
    deleteQuestion(questionIdx) {
      this.gameToEdit.questions.splice(questionIdx, 1);
      this.$emit("updateDetails", this.gameToEdit);
    }
  },
  computed: {
    readyToAdd() {
      return this.gameToEdit && this.$route.params.action === "add";
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

