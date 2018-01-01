<template>
    <section class="login-section">
    <v-form class="login-form" v-model="valid" @submit.prevent="login">
        <v-text-field label="E-mail" v-model="loginDetails.username" :rules="emailRules" :counter="10" required></v-text-field>
        <v-text-field label="Password" type="password" v-model="loginDetails.pass" required></v-text-field>
            <v-btn class="login-btn" @click="login">Login</v-btn>
        <h2>or</h2>
        <img src="../assets/fblogin.png">
        <router-link :to="'/signup-page'">
            <span>sign up</span>
        </router-link>
    </v-form>
    </section>
</template>

<script>
import { LOGIN } from "../modules/UserModule";
import swal from "sweetalert2";

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
          console.log("@@", _);
          this.$router.push("/");
        })
        .catch(err => {
          swal("Can't Login", "uncorrect mail or password", "error");
        });
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
