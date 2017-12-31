<template>
    <v-card v-if="game && user">
        <v-card-media :src="game.img" height="300px">
        </v-card-media>
        <v-card-title primary-title class="title-container">
            <div>
                <h3 class="headline mb-0">{{game.name}}</h3>
                <h5>TODO: Add category</h5>
                <div>
                    <v-card-actions class="card-actions">
                        <v-btn color="teal" value="play" dark @click.native.stop="dialog = true">
                            <span>play</span>
                            <v-icon>play_circle_outline</v-icon>
                        </v-btn>
                        <router-link :to="'/edit-game/'+game._id">
                        <v-btn v-if="canEdit" color="teal" value="Edit" dark>
                            <span>Edit</span>
                            <v-icon>edit</v-icon>
                        </v-btn>
                        </router-link>
                    </v-card-actions>
                </div>

                <div>{{game.description}}</div>
                <br>
                <router-link :to="'/user-profile/' + user._id">
                <div class="user">
                    <v-avatar size="50px">
                        <img :src="user.img" :alt="'Photo of '+user.name">
                    </v-avatar>
                    <p>{{user.name}}</p>
                </div>
                </router-link>
                <div>Craeted {{timeAgo}}</div>

                <div class="rank">
                    <div>
                        <span class="fa fa-trophy"></span>
                        <span>{{game.highscore}}</span>
                    </div>
                    <div>
                        <span>{{game.playersCount}}</span>
                        <span class="fa fa-users"></span>
                    </div>
                    <div>
                        <span>{{createdDate}}</span>
                        <span class="fa fa-clock-o"></span>
                    </div>
                </div>

            </div>
        </v-card-title>
        <startgame-modal :dialog="dialog" :game="game"></startgame-modal>
    </v-card>
</template>
<script>
import StartgameModal from "../EditCmps/StartGameModal.vue";
import moment from "moment";
export default {
  props: {
    game: Object,
    user: Object,
    canEdit: Boolean
  },
  data() {
    return {
      dialog: false
    };
  },
  components: {
    StartgameModal
  },
  computed: {
    timeAgo() {
      return moment(this.game.createdAt).fromNow();
    },
    createdDate() {
      return moment(this.game.createdAt).format("l");
    }
  }
};
</script>
<style lang="scss" scoped>
.card-actions {
  margin: 20px 0px;
  padding: 0;

  button {
    margin: 0px, 1em;

    span {
      margin-right: 0.5em;
    }
  }
}
.rank {
  position: absolute;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 2em;
  div {
    padding: 15px;
    span {
      padding: 5px;
    }
  }
}
.user {
  border-radius: 2px;
  p,
  img {
    font-size: 1.1em;
    margin-bottom: 0px;
    padding: 0.2em;
    color: black;
    cursor: pointer;
    display: inline-block !important;
  }
  &:hover {
    background-color: rgb(240, 240, 240);
  }
}
</style>
