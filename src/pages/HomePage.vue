<template>
    <div class="page-container">
        <section class="welcomeSection">
            <h1>WELCOME TO SWALLA</h1>
            <h3 class="intro">
            The Place Where A Simple Question Turns Into An Exciting Game
            </h3>
        </section>
        <section class="games-section">
            <div class="container">
              <div class="actions-container">
                <div class="input-container">
                    <div class="text-xs-center">
                    <v-menu offset-y  class="AudienceBtn">
                      <v-btn color="pink darken-3" dark slot="activator">Audience
                        <v-icon style="padding-left:10px;">expand_more</v-icon>
                      </v-btn>
                      <v-list>
                          <v-list-tile-title class="AudienceTab" @click="setAudience('all')">All</v-list-tile-title>
                          <v-list-tile-title class="AudienceTab" @click="setAudience('family')">Famliy</v-list-tile-title>
                          <v-list-tile-title class="AudienceTab" @click="setAudience('work')">Work</v-list-tile-title>
                          <v-list-tile-title class="AudienceTab" @click="setAudience('school')">School</v-list-tile-title>
                      </v-list>
                    </v-menu>
                  </div>
                  <div class="SearchInput">
                    <v-icon>search</v-icon>
                    <input type="text" placeholder="Search game" @input="setFilter" v-model="filterBy" />
                  </div>
                  <div class="SearchInput">
                    <v-icon>fiber_pin</v-icon>
                    <input v-model="pin" style="text" placeholder="Enter your pin here" @keyup.enter="searchPin"/>
                  </div>
                <v-btn color="deep-purple darken-2" dark @click="searchPin">Play</v-btn>
                </div>
                </div>
                <game-list></game-list>
            </div>
        </section>
    </div>
</template>
<script>
import GameList from "../components/HomeComps/GameList";
import { SET_FILTER, SET_AUDIENCE } from "../modules/GamesModule";
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
      if (this.pin === "8====>") {
        this.$router.push("/avinoam");
        return;
      }
      this.$router.push("/game/:gameId/play-multi/" + this.pin);
    },
    setAudience(audience) {
      this.$store.commit({ type: SET_AUDIENCE, audience });
    }
  },
  created() {
    this.$store.commit({ type: SET_FILTER, filterBy: "" });
    this.$store.commit({ type: SET_AUDIENCE, audience: 'all' });
  }
};
</script>

<style lang="scss" scoped>

.page-container{
  display: flex;
  flex-direction: column;
}

.welcomeSection {
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  height: auto;
  padding: 20px 40px;
  width: 100%;
  margin-bottom: 20px;
  h1 {
    width: 70%;
    font-size: 60px;
    color: rgba(255, 255, 255, 0.897);
  }

  h3 {
    width: 70%;
    font-size: 25px;
    color: rgba(255, 255, 255, 0.897);
  }

  animation: Gradient 15s ease infinite;
}

.AudienceTab {
  padding-bottom: 5px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: #f0efef;
  }
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
  width: 100%;

  .container {
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 100%;

    .actions-container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
    }

    .input-container {
      width: 80%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .SearchInput {
        border: 1px solid rgb(192, 192, 192);
        border-radius: 3px;
        width: 33%;
        height: 38px;
        box-shadow: inset 0 0 4px #c2c2c2;
        background: rgb(236, 236, 236);

        i {
          margin-left: 0.3em;
        }
      }
      input {
        height: 100%;
        width: 80%;
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

@media (max-width: 700px) {
  .welcomeSection {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 30 px !important;
    }
  }

  .intro {
    font-size: 17px !important;
    width: 100% !important;
    text-align: center !important;
  }

  .actions-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100% !important;

    .SearchInput {
      width: 100% !important;
      margin-bottom: 7px;
      margin-bottom: 1em;
    }
  }

  .text-xs-center {
    margin-bottom: 10px !important;
  }
}
</style>

