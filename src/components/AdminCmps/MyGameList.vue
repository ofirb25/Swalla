<template>
    <section>
        <div class="controlsContainer">
            <v-text-field label="Search" @input="setFilter" v-model="filterBy">
            </v-text-field>
            <div :absolute="true" :value="true" :active.sync="e1" color="transparent">
                <v-btn flat color="teal" value="recent">
                    <span>Recent</span>
                    <v-icon>history</v-icon>
                </v-btn>
                <v-btn flat color="teal" value="Popular">
                    <span>Popular</span>
                    <v-icon>favorite</v-icon>
                </v-btn>
            </div>
        </div>
        <div>
            <router-link v-for="game in games" :to="'/my-game/'+game._id" :key="game._id" >
                <my-game-preview :game="game" :canEdit="canEdit" :key="game._id"  class="game-container"></my-game-preview>
            </router-link>
        </div>
        <v-btn  v-if="canEdit" fab dark color="indigo">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </v-btn>
        
        <v-btn>Show More...</v-btn><!-- not yet functional -->
    </section>
</template>
<script>
import MyGamePreview from "./MyGamePreview";
export default {
  data() {
    return {
      e1: "recent",
      filterBy: "",
    };
  },
  computed: {
    games() {
      return this.$store.getters.userGamesToDisplay;
    }
  },
  components: {
    MyGamePreview
  },
  methods: {
    setFilter() {
      this.$store.commit({ type: SET_FILTER, filterBy: this.filterBy });
    }
  },
  props: {
    canEdit: Boolean,
    userId: String
  }
};
</script>
<style lang="scss" scoped>
  .game-container {
    margin: 1em 0px;
  }
</style>
