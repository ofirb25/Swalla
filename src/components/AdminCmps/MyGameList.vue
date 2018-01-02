<template>
    <section>
        <div class="controlsContainer">
            <v-text-field label="Search" @input="setFilter" v-model="filterBy">
            </v-text-field>
            <div :absolute="true" :value="true" :active.sync="e1" color="transparent">
                <v-btn flat color="teal" value="recent" @click="setSort('time')">
                    <span>Recent</span>
                    <v-icon>history</v-icon>
                </v-btn>
                <v-btn flat color="teal" value="Popular" @click="setSort('popular')">
                    <span>Popular</span>
                    <v-icon>favorite</v-icon>
                </v-btn>
            </div>
        </div>
        <div>
            <router-link v-for="game in games" :to="'/my-game/details/'+game._id" :key="game._id" >
                <my-game-preview :game="game" :canEdit="canEdit" :key="game._id"  class="game-container" :userId="userId"></my-game-preview>
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
import { SET_USER_FILTER, SET_SORT } from "../../modules/GamesModule";

export default {
  data() {
    return {
      e1: "recent",
      filterBy: ""
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
      this.$store.commit({ type: SET_USER_FILTER, filterBy: this.filterBy });
    },
    setSort(sortBy) {
      this.$store.commit({type: SET_SORT, sortBy})
    },
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
