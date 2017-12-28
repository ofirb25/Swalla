<template>
  <section>
        <h1>See who already Joined</h1>
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