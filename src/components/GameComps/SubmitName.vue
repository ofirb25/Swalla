<template>
    <div class="nick">
        <v-form @submit.prevent="saveName">
            <v-text-field label="Your Nickname??" v-model="playerName" :counter="10">
            </v-text-field>
            <v-btn color="purple" @click="saveName">Start Playing!</v-btn>
        </v-form>
    </div>
</template>
<script>
export default {
  data() {
    return {
        playerName : ''
    };
  },
  methods :{
      saveName() {
          this.$emit('saveName',this.playerName)
      }
  }
};
</script>
<style lang="scss" scoped>
.nick {
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

