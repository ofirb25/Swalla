<template>
    <section>
        <div class="container">
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
            <my-game-list></my-game-list>
            <v-btn fab dark color="indigo">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </v-btn>
        </div>
    </section>
</template>

<script>
import MyGameList from "../components/AdminCmps/MyGameList";
import { SET_FILTER } from "../modules/GamesModule";

export default {
  data() {
    return {
      filterOps: ["New", "Holiday", "School"],
      e1: "recent",
      filterBy: ""
    };
  },
  methods: {
    setFilter() {
      this.$store.commit({ type: SET_FILTER, filterBy: this.filterBy });
    }
  },
  components: {
    MyGameList
  }
};
</script>