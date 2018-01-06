<template>
    <v-card v-if="(game && user) || readyToAdd">
        <v-card-media :src="gameToEdit.img" height="300px">
        </v-card-media>
        <v-card-title primary-title class="title-container">
            <div class="fixing">
              <div v-if="!onEditMode">
                <h3 class="headline mb-0">{{game.name}}</h3>
                <h5>{{game.audience}}</h5>
              </div>
              <div v-else-if="gameToEdit">
                <v-text-field v-model="gameToEdit.img" label="Image" @input="updateDetails"></v-text-field>
                <v-text-field v-model="gameToEdit.name" label="Name" @input="updateDetails"></v-text-field>
                <v-select v-model="gameToEdit.audience" v-bind:items="items" label="Audience"  @input="updateDetails"></v-select>
                <v-text-field label="description" textarea v-model="gameToEdit.description" @input="updateDetails"></v-text-field>
                <v-checkbox label="Public?" v-model="gameToEdit.isPublic" @change="updateDetails"></v-checkbox>
              </div>
                <div>
                    <v-card-actions class="card-actions" v-if="!onEditMode">
                        <v-btn color="teal" value="play" dark @click.native.stop="dialog = true">
                            <span>Play</span>
                            <v-icon>play_circle_outline</v-icon>
                        </v-btn>
                        <router-link :to="'/my-game/edit/'+game._id">
                        <v-btn v-if="isAdmin" color="teal" value="Edit" dark>
                            <span>Edit</span>
                            <v-icon>edit</v-icon>
                        </v-btn>
                        </router-link>
                    </v-card-actions>
                </div>
                <div v-if="!onEditMode">{{game.description}}</div>
                <br>
                <router-link  v-if="!onEditMode" :to="'/user-profile/' + user._id">
                <div class="user">
                    <v-avatar size="50px">
                        <img :src="user.img" :alt="'Photo of '+user.name">
                    </v-avatar>
                    <p>{{user.name}}</p>
                </div>
                </router-link>
                <div v-if="!onEditMode">Craeted {{timeAgo}}</div>

                <div  v-if="!onEditMode" class="rank">
                    <div>
                        <img src="../../assets/cup.png"/>
                        <span>{{game.highscore}}</span>
                    </div>
                    <div>
                        <img src="../../assets/played.png"/>
                        <span>{{game.playersCount}}</span>
                    </div>
                    <div>
                        <img src="../../assets/clock.png"/>
                        <span>{{createdDate}}</span>
                    </div>
                </div>

            </div>
        </v-card-title>
        <startgame-modal v-if="game" @closeDialog="dialog=false" :dialog="dialog" :game="game"></startgame-modal>
    </v-card>
</template>
<script>
import StartgameModal from "../StartGameModal.vue";
import moment from "moment";
export default {
  props: {
    game: Object,
    user: Object,
    isAdmin: Boolean,
    onEditMode: Boolean,
    editableGame: Object,
    fixer: Boolean
  },
  data() {
    return {
      dialog: false,
      items: ["Family", "Work", "School"],
      gameToEdit: null
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
    },
    readyToAdd() {
      return (this.gameToEdit && this.$route.params.action === 'add')
    }
  },
  watch: {
    fixer: function(_) {
      this.gameToEdit = JSON.parse(JSON.stringify(this.editableGame));
    }
  },
  methods: {
    updateDetails() {
      this.$emit("updateDetails", this.gameToEdit);
    }
  }
};
</script>
<style lang="scss" scoped>
.fixing{
  display: flex;
  flex-direction: column;
}

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
  // position: absolute;
  // bottom: 0px;
  // left: 0px;
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
  @media (max-width: 700px) {
    position: relative;
    font-size: 1.2em;
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
.fixing {
  width: 100%;
}

</style>
