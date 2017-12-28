<template>
  <section>
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