<template>
    <div class="page-container">
        <section class="wellcomSection">
            <h1>SWALLA</h1>
            <h3>Most good looking, amazing, nice great, kahoot like website, in the all entire world!
            </h3>
        </section>
        <section class="games-section">
            <div class="container">
              <div class="actions-container">
                <div class="input-container">
                  <div class="SearchInput">
                    <v-icon>search</v-icon>
                    <input type="text" placeholder="Search game" @input="setFilter" v-model="filterBy" />
                  </div>
                  <div class="SearchInput">
                    <v-icon>fiber_pin</v-icon>
                    <input v-model="pin" style="text" placeholder="Enter your pin here" />
                  </div>
                </div>
                <v-btn @click="searchPin">play</v-btn>
                </div>
                <game-list></game-list>
            </div>
        </section>
    </div>
</template>
<script>
import GameList from "../components/HomeComps/GameList";
import { SET_FILTER } from "../modules/GamesModule";
export default {
  data() {
    return {
      filterBy: "",
      pin: ""
    };
  },
  components: {
    GameList
  },
  methods: {
    setFilter() {
      this.$store.commit({ type: SET_FILTER, filterBy: this.filterBy });
    },
    searchPin() {
      this.$router.push("/game/:gameId/play-multi/" + this.pin);
    }
  }
};
</script>

<style lang="scss" scoped>
.actions-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.wellcomSection {
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  height: auto;
  padding: 20px;
  width: 100%;
  margin-bottom: 20px;
  h1 {
    font-size: 60px;
    color: rgba(255, 255, 255, 0.897);
  }

  h3 {
    width: 50%;
    font-size: 25px;
    color: rgba(255, 255, 255, 0.897);
  }

  animation: Gradient 15s ease infinite;
}

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
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

      .SearchInput {
        border: 1px solid rgb(192, 192, 192);
        border-radius: 3px;
        width: 48%;
        height: 38px;
        box-shadow: inset 0 0 4px #c2c2c2;

        i {
          margin-left: 0.3em;
        }
      }
      input {
        height: 100%;
        width: 88%;
      }
      input:focus {
        outline: none;
      }
      input::placeholder {
        color: rgb(153, 153, 153);
      }
    }
  }
}
</style>

