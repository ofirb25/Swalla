<template>
    <section v-if="games" class="games-container">
        

            <div @click="checkLogin" class="create-container">
                <!-- <router-link to="/my-game/add"> -->
                    <v-card class="game-item">
                        <div class="icon-container">
                            <v-icon class="addSign ">add</v-icon>
                        </div>
                        <div class="title-container">
                            <span class="headline">{{'Create Your Own Game!'}}</span>
                        </div>
                    </v-card>
                <!-- </router-link> -->
            </div>

            <router-link v-for="game in games" :to="'/game/'+game._id" :key="game._id">
                <game-preview :game="game" class="game-item"></game-preview>
            </router-link>
       
    </section>
</template>

<script>
import { LOAD_GAMES } from "../../modules/GamesModule";
import GamePreview from "./GamePreview";
import swal from "sweetalert2";
export default {
  created() {
    this.$store.dispatch({ type: LOAD_GAMES }).then(games => {});
  },
  computed: {
    games() {
      return this.$store.getters.gamesToDisplay;
    }
  },
  components: {
    GamePreview
  },
  methods:{
    checkLogin(){
      if(!this.$store.getters.isUser){
        swal('Log In First',
          'You must be logged in to create',
            'error'
          )
        return;
      }else{
        this.$router.push('/my-game/add')
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.games-container {
  display: flex;
  // justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;

  .game-item {
    width: 250px;
    height: 335px !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1em;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      transform: scale(1.03);
    }
  }

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    .game-item {
    margin: 20px auto;
    width: 90vw;

    }
  }

  .headline {
    text-align: center;
    display: block;
    color: rgba(0, 0, 0, 0.726);
    font-weight: bold;

  }

  .addSign {
    font-size: 15em;
    margin: 0 auto;
    display: flex;
    color: rgba(255, 255, 255, 0.801);
  }

  

  .icon-container {
    color: #fff;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    height: auto;
    padding: 20px 40px;
    width: 100%;
    

    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;

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

.headline-holder{
    display: flex;
    justify-content: center;
  }

}
</style>
