<template>
    <section class="login-section">
      <v-form class="login-form" v-model="valid">
          <v-text-field label="Name" v-model="signupDetails.name" :rules="nameRules" :counter="10" required></v-text-field>
          <v-text-field label="E-mail" v-model="signupDetails.username" :rules="emailRules" :counter="10" required></v-text-field>
          <v-text-field label="Password" type="password" v-model="signupDetails.pass" required></v-text-field>
          <v-text-field label="Porfile picture" v-model="signupDetails.img"></v-text-field>
          <v-btn class="login-btn" @click="signup">Signup</v-btn>
      </v-form>
    </section>
</template>

<script>
import { SIGNUP } from "../modules/UserModule.js";

export default {
  data() {
    return {
      valid: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      signupDetails: { name: "", username: "", pass: "", img: "" }
    };
  },
  methods: {
    signup() {
      if (!this.signupDetails.img) this.signupDetails.img = 'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX3451338.jpg'
      this.signupDetails.signInDate = Date.now()
      this.$store
        .dispatch({ type: SIGNUP, signupDetails: this.signupDetails })
        .then(_ => {
          this.$router.push("/");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

 <style lang="scss" scoped>

.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .login-form {
    width: 20%;
    min-width: 250px;
    // height: 70vh;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      height: 40px;
    }

    .login-btn {
      width: 100%;
    }

    @media (max-width: 700px) {
      width: 80%;
    }
  }
}
</style>
