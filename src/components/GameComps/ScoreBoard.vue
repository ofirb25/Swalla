<template>
    <div v-if="players">
    <h1 class="display-2">Score Board</h1>
    <div class="userScore" v-for="player in players" :key="player.userId">
    {{player.nickname}} -
    {{player.score}}
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