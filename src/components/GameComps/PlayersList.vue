<template>
  <section>
        <h1 class="title">Waiting for players</h1>
        <h2 class="subtitle">See who already Joined</h2>
        <ul>
          <li v-for="player in players" :key="player.userId">{{player.nickname}}</li>
        </ul>
  </section>
</template>
<script>
    export default {
        props:{
            players : Array
        }
    }
</script>