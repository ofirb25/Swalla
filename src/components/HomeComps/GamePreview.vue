<template>
    <v-card class="game-item">
        <v-card-media class="white--text" height="200px" :src="game.img">
            <v-container fill-height fluid>
                <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                        <span class="headline">{{game.name}}</span>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-media>
        <v-card-title>
            <div>
                <span class="grey--text">{{game.description | strLength}}</span>
                <br>
            </div>
        </v-card-title>
        <v-card-actions class="game-stats">
            <div>
                <img src="../../assets/cup.png"/>
                <span>{{game.highscore}}</span>
            </div>
             <div>
                <span style="font-weight:bold;" @click.prevent="GoToUserProfile(game.ownerId)">{{game.ownerName}}</span>
            </div>
            <div>
                <span>{{game.playersCount}}</span>
                <img src="../../assets/played.png"/>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
import { LOAD_GAMES } from "../../modules/GamesModule";
import UserService from "../../services/UserService";

export default {
  props: {
    game: Object
  },
  filters: {
    strLength: function(value) {
      if (!value) return "";
      value = value.toString();
      if (value.length > 90) return value.substring(0, 90) + "...";
      else return value;
    }
  },
  methods:{
      GoToUserProfile(userId){
          this.$router.push(`/user-profile/${userId}`)
      }
  }
};
</script>
<style lang="scss" scoped>
.game-stats {
  padding: 10px;
  display: flex;
  justify-content: space-between;

  div * {
    padding-right: 5px;
  }

  img {
    width: 25px;
  }
}
.headline {
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.719);
  font-weight: bold;
  text-align: center;
}
.card__title {
  transition: all 0.3s;
}
</style>
