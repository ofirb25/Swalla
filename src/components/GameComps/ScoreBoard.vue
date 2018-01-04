<template>
    <section>
        <div v-if="players" class="score-board">
            <div class="flexer">
                <h1 class="display-1 align-center board-title">Score Board</h1>
                <div class="userScore">
                    <table>
                        <thead>
                            <th>
                                Nickname
                            </th>
                            <th>
                                Score
                            </th>
                        </thead>
                        <tbody>
                            <tr v-for="(player,idx) in players" :key="idx">
                                <td>
                                    {{idx+1}}.{{player.nickname}}
                                </td>
                                <td>
                                    {{player.score}}
                                </td>
                                <div v-if="isUser(player.nickname) && !isGameOn" class="share-facebook">
                                    <social-sharing :url="'https://swalla.herokuapp.com/' " title="" description=""
                                     :quote="'Wow! My score is ' + player.score +'!'" inline-template>
                                        <div>
                                            <network network="facebook">
                                                <v-btn dark color="indigo" value="share">
                                                    <span>Share on facebook!</span>
                                                    <i class="fa fa-facebook"></i> 
                                                </v-btn>
                                            </network>
                                        </div>
                                    </social-sharing>
                                </div>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  props: {
    players: Array,
    isGameOn: Boolean,
    playerName: String
  },
  methods: {
    isUser(nickname) {
      console.log('1', this.playerName, '2',nickname)
      return this.playerName === nickname
    }
  }
};
</script>

 <style lang="scss" scoped>
h1 {
  text-align: center;
  margin: 20px 0;
}

table {
  font-size: 1.2em;
  width: 50vw;
  text-align: left;
  margin: auto;
  tr,
  th {
    text-align: center;
  }
  td {
    padding: 0.8em 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.116);
    .winner {
      font-size: 2em;
    }
  }
  .rank {
    font-size: 0.8em;
  }
  .share-facebook{
    max-width: 0px;
  }
}

@media (max-width: 700px) {
}
</style>