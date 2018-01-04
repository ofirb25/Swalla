<template>
       <section class="container">
    <v-avatar size="500px">
      <img src="../assets/avinoam.png" alt="John">
    </v-avatar> 
  </section>
</template>

<script>
import vuetify from "../assets/vuetify.mp3";

export default {
  created() {
    var sound = new Audio(vuetify);
    sound.play();
  }
};
</script>

 <style lang="scss" scoped>
 .container{
         align-self: center;
         width: 100%;

         display: flex;
         justify-content: center;
         align-items: center;
 }
</style>
