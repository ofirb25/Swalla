<template>
    <section class="games-section">
        <div class="container">
          <section class="wellcomSection">
            <h1>SWALLA</h1>
            <h3>Most good looking, amazing, nice great, kahoot like website, in the
              all entire world!
            </h3>
          </section>

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
.wellcomSection{
  height: auto;
  padding: 20px;
  width: 118%;
  background: rgba(50, 6, 80, 0.589);
  margin-bottom: 20px;

  h1 {
      font-size: 70px;
      color: rgba(249, 246, 252, 0.699);
    }

    h3{
      width: 50%;
      font-size: 30px;
      color: rgba(249, 246, 252, 0.699);
    }
}

.games-section {
  display: flex;
  justify-content: center;

  .container {
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    

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

