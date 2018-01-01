<template>
<section>
    <div v-if="players" class="score-board">
      <div class="flexer">
    <h1 class="display-2 board-title">Score Board</h1>
    <div class="userScore" v-for="(player,idx) in players" :key="idx">
      <div class="userScore-name">
       {{idx+1}}. {{player.nickname}}:
      </div>
     <div>
       {{player.score}}
       <img src="../../assets/coins.png">
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
.score-board {
  height: 100%;
  color: #fff;
  display: flex;
  flex-direction: row-reverse;


  .flexer{
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: left;
  }

  h1 {
    margin-bottom: 20px;
  }

  .userScore {
    font-size: 30px;
    // width: 20%;
    display: flex;
    // justify-content: space-around;
    justify-content: center;
    

    .userScore-name{
      margin-right: 20px;
    }

    img {
      width: 17px;
    }

    
  }
  .board-title {
    font-weight: bold;
  }

  @media (max-width:700px) {
       .score-board {
         justify-content: center;
         flex-direction: row;
       }
    }
}
</style>