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
    players: Array
  }
};
</script>

 <style lang="scss" scoped>
 h1{
   text-align: center;
   margin:20px 0;
 }

table {
  font-size: 1.2em;
  width: 50vw;
  text-align: left;
  margin: auto;
  tr,th {
    text-align: center;
  }
  td {
    padding:0.8em 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.116);
    .winner {
      font-size:2em;
    }
  }
  .rank{
    font-size: 0.8em
  }
}

@media (max-width: 700px) {
}
</style>