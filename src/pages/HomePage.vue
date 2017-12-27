<template>
    <section class="games-section">
        <div class="container">
            <h1>READY TO DO PIGUIM?</h1>
        <div class="input-container">
        <input style="text" placeholder="⌕ Search game"/>
        <input style="text" placeholder="Enter your pin here"/>
        </div>
        <game-list></game-list>
        </div>
    </section>
</template>

<script>
import GameList from "../components/HomeComps/GameList";
export default {
  components: {
    GameList
  }
};
</script>

<style lang="scss" scoped>
.games-section {
  display: flex;
  justify-content: center;

  .container {
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
         margin-bottom: 10px;
         font-size: 70px;
         color: rgba(176, 132, 226, 0.699);
    }

    .input-container {
        width: 50%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
      input {
        border: 2px solid rgba(0, 0, 0, 0.452);
        border-radius: 3px;
        width: 48%;
      }
    }
  }
}
</style>

