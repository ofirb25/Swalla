<template>
    <section class="games-section">
        <div class="container">
            <h1>SWALLA</h1>

        <div class="input-container">
        <input class="SearchInput" style="text" placeholder="⌕ Search game" @input="setFilter" v-model="filterBy"/>
      
        <div class="pinInput">
        <input v-model="pin" style="text" placeholder="Enter your pin here"/>
        <v-btn @click="searchPin">play</v-btn>
        </div>
        </div>

        <game-list></game-list>
        </div>
    </section>
</template>

<script>
import GameList from "../components/HomeComps/GameList";
import { SET_FILTER } from "../modules/GamesModule";
export default {
  data() {
    return {
      filterBy: '',
      pin: ''
    }
  },
  components: {
    GameList
  },
  methods: {
    setFilter() {
      this.$store.commit({ type: SET_FILTER, filterBy: this.filterBy });
    },
    searchPin(){
      this.$router.push('/game/:gameId/play-multi/'+this.pin)
    }
  }
};
</script>

<style lang="scss" scoped>
.games-section {
  display: flex;
  justify-content: center;

  .container {
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin-bottom: 10px;
      font-size: 70px;
      color: rgba(176, 132, 226, 0.699);
    }

    .input-container {
      width: 70%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      
      .SearchInput {
        border: 2px solid rgba(0, 0, 0, 0.452);
        border-radius: 3px;
        width: 48%;
      }

      .pinInput{
        width: 50%;
        
        input{
        border: 2px solid rgba(0, 0, 0, 0.452);
        border-radius: 3px;
        height: 100%;
        width: 60%;
        }
       
      }
    }
  }
}
</style>

