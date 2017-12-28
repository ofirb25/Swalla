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
        <div class="games-container">
            <router-link v-for="game in games" :to="'/my-game/'+game._id" :key="game._id">
                <my-game-preview :game="game" :key="game._id"></my-game-preview>
            </router-link>
        </div>
        <v-btn fab dark color="indigo">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </v-btn>
        
        <v-btn>Show More...</v-btn><!-- not yet functional -->
    </section>
</template>
<script>
import { LOAD_GAMES, SET_FILTER , SET_TEMP_USER_ID} from "../../modules/GamesModule";
import MyGamePreview from "./MyGamePreview";
export default {
  data() {
    return {
      e1: "recent",
      filterBy: "",
      currUserId: null
    };
  },
  created() {
    this.currUserId = this.$route.params.userId
    this.$store.dispatch({ type: LOAD_GAMES }).then(games => {});
    this.$store.commit({ type: SET_TEMP_USER_ID, ownerId: this.currUserId });
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
  }
};
</script>
