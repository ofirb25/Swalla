<template>
    <v-flex xs12 sm4 >
        <v-card v-if="gameImg">
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Your Game Is Ready!</h3>
                    <h4 class="subtitle">Invite your friends to this match!</h4>
                    <div>
                        Send them this link : <br/>
                        <input type="text" readonly :value="gameUrl" ref="gameUrl">
                        <v-btn @click="copyUrl('gameUrl')" dark color="teal">Copy</v-btn>
                        <p><strong>Or</strong> tell them to go to: <br/>{{url}}, And insert this pin:
                            <input type="text" readonly :value="pin" @click="copyUrl('gamePin')" ref="gamePin">
                        </p>
                        <div class="copied">
                        <p v-show="isCopied">Copied to clipboard!</p>
                        </div>
                        <a :href="`whatsapp://send?text=${gameUrl}`" class="mobile">Share on whatsapp</a>
                    </div>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-btn dark color="purple"  @click="startGame" block value="Begin Game" class="start-game">PLAY</v-btn>
                <!-- <v-btn dark color="blue">Cencel</v-btn> -->
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
export default {
  props: {
    gameUrl: String,
    pin: String,
    url: String
  },
  data() {
    return {
      isCopied: false
    };
  },
  methods: {
    copyUrl(el) {
      this.$refs[el].select();
      document.execCommand("Copy"), (this.isCopied = true);
      setTimeout(() => {
        this.isCopied = false;
      }, 1000);
    },
    startGame() {
        this.$emit('startGame')
    }
  },
  computed: {
    gameImg() {
      return this.$store.getters.currMultiGame;
    }
  },
  created() {
    // console.log(this.$store.getters.currMultiGame.img, "imggg");
  }
};
</script>
<style lang="scss" scoped>
.copied {
    
  height:2em
}

input{
    font-weight: bold;
}
</style>
