<template>
    <v-flex xs12 sm4 >
        <v-card v-if="gameImg">
            <!-- <v-card-media :src="gameImg.img" height="200px">
            </v-card-media> -->
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">Your Game Is Ready!</h3>
                    <h4 class="subtitle">Invite your friends to this match!</h4>
                    <div>
                        Send them this link : <br/>
                        <input type="text" readonly :value="gameUrl" @click="copyUrl('gameUrl')" ref="gameUrl">
                        <p><strong>Or</strong> tell them to go to: <br/>{{url}} And insert this pin:
                            <input type="text" readonly :value="pin" @click="copyUrl('gamePin')" ref="gamePin">
                        </p>
                        <p v-if="isCopied">Copied to clipboard!</p>
                        <a :href="`whatsapp://send?text=${gameUrl}`" class="mobile">Share on whatsapp</a>
                    </div>
                </div>
            </v-card-title>
            <v-card-actions>
                <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>



    <!-- <div v-if="gameUrl" class="invite-details">
        <h2>Invite your friends to this match!</h2>
        <div>
            Send them this link :
            <input type="text" readonly :value="gameUrl" @click="copyUrl('gameUrl')" ref="gameUrl">
            <p>Or tell them to go to: {{url}} And insert this pin:
                <input type="text" readonly :value="pin" @click="copyUrl('gamePin')" ref="gamePin">
            </p>
            <a :href="`whatsapp://send?text=${gameUrl}`" class="mobile">Share on whatsapp</a>
            <span v-if="isCopied">Copied to clipboard!</span>
        </div>
    </div> -->
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