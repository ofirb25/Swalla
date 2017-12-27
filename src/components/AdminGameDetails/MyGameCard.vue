<template>
        <v-card v-if="game">
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
                        </v-card-actions>
                    </div>
                    <div>{{game.description}}</div>
                    <br><br>
                    <div>Craeted at: {{game.createdAt}}</div>
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
                            <span>{{game.createdAt}}</span>
                            <span class="fa fa-clock-o"></span>
                        </div>
                    </div>

                </div>
            </v-card-title>
            <startgame-modal :dialog="dialog" :game="game"></startgame-modal>

        </v-card>
</template>
<script>
export default {
  props: {
    game: Object
  },
  data() {
    return {
      dialog: false
    };
  },
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
</style>
