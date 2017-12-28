<template>
    <v-form class="login-section" v-model="valid" @submit.prevent="login">
        <v-text-field label="E-mail" v-model="loginDetails.username" :rules="emailRules" :counter="10" required></v-text-field>
        <v-text-field label="Password" type="password" v-model="loginDetails.pass" required></v-text-field>
            <v-btn class="login-btn" @click="login">Login</v-btn>
        <h2>or</h2>
        <img src="../assets/fblogin.png">
        <router-link :to="'/signup-page'">
            <span>sign up</span>
        </router-link>
    </v-form>
</template>

<script>
import { LOGIN } from '../modules/UserModule';

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
      loginDetails: { username: "", pass: "" }
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch({ type: LOGIN, loginDetails: this.loginDetails })
        .then(_ => {
          this.$router.push("/");
        })
    }
  }
};
</script>

 <style lang="scss" scoped>
.login-section {
  width: 20%;
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
}
</style>
