<template>
    <div v-if="players" class="score-board">
    <h1 class="display-2 board-title">Score Board</h1>
    <div class="userScore" v-for="(player,idx) in players" :key="idx">
      <div>
       {{idx+1}}. {{player.nickname}}:
      </div>
     <div>
       {{player.score}}
       <img src="../../assets/coins.png">
     </div>
    </div>
    </div>
</template>

<script>
export default {
  props : {
    players: Array
  },
};
</script>

 <style lang="scss" scoped>
.score-board {
  height: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;

  h1 {
    margin-bottom: 20px;
  }

  .userScore {
    font-size: 30px;
    width: 20%;
    display: flex;
    justify-content: space-around;

    img {
      width: 17px;
    }
  }

  .board-title {
    font-weight: bold;
  }
}
</style>