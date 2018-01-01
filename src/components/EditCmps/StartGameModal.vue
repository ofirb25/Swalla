<template>
  <v-dialog v-model="dialog2" max-width="500">
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
              <router-link tag="div" :to="'/game/'+ game._id+'/play-multi'">
                  <div>
                      <img src="../../assets/multiple-users.png">
                      <h4>Invite players</h4>
                  </div>
              </router-link>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.native.stop="closeDialog">Close</v-btn>
          </v-card-actions>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog2: null
    };
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    }
  },
  created() {
    this.dialog2 = this.dialog;
  },
  watch: {
    dialog: function(newDialog) {
      this.dialog2 = this.dialog;
    },
    dialog2: function(x) {
      if (!this.dialog2) {
        this.$emit("closeDialog");
      }
    }
  },
  props: {
    dialog: Boolean,
    game: Object
  }
};
</script>

 <style lang="scss" scoped>
.modal-content {
  display: flex;
  justify-content: space-around;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
}
</style>
