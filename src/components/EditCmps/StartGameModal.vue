<template>
  <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Choose game style:</v-card-title>
        <v-card-text class="modal-content">
          <router-link tag="div" :to="'/game/'+ game._id+'/play'">
          <div>
            <img src="../../assets/single-player.png">
            <h4>Single player</h4>
          </div>
          </router-link>
          <h1>or</h1>
          <div>
            <img src="../../assets/multiple-users.png">
             <h4>Invite players</h4>
          </div>
          </v-card-text>
        
      </v-card>
    </v-dialog>

  
</template>

<script>
export default {
  data() {
    return {
       
    }
  },
  props:{
      dialog: Boolean,
        game: Object
  }
}
  
</script>

 <style lang="scss" scoped>


</style>
