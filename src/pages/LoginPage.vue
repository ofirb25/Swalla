<template>
    <section class="login-section">
    <v-form class="login-form" v-model="valid" @submit.prevent="login">
        <v-text-field label="E-mail" v-model="loginDetails.username" :rules="emailRules" :counter="10" required></v-text-field>
        <v-text-field label="Password" type="password" v-model="loginDetails.pass" required></v-text-field>
            <v-btn class="login-btn" @click="login">Login</v-btn>
            <fb-signin-button
              :params="fbSignInParams"
              @success="onSignInSuccess"
              @error="onSignInError">
              Sign in with Facebook
            </fb-signin-button>
        <h2>or</h2>
        <router-link :to="'/signup-page'">
            <span>sign up</span>
        </router-link>
    </v-form>
    </section>
</template>

<script>
import { LOGIN } from "../modules/UserModule";
import swal from "sweetalert2";

window.fbAsyncInit = function() {
  FB.init({
    appId: 1750395041640447,
    cookie: true,
    xfbml: true,
    version: "v2.11"
  });

  FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
export default {
  data() {
    return {
      fbSignInParams: {
        scope: "email,user_likes",
        return_scopes: true
      },
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
        .catch(err => {
          swal("Can't Login", "uncorrect mail or password", "error");
        });
    },
    onSignInSuccess(response) {
      FB.api("/me?fields=id,name,picture,email", dude => {
        var loginDetails = {username: dude.email, pass: dude.id}
        this.$store
          .dispatch({ type: LOGIN, loginDetails })
          .then(_ => {
            this.$router.push("/");
          })
          .catch(err => {
            var signupDetails = {
              name: dude.name,
              username: dude.email,
              pass: dude.id,
              img: dude.picture.data.url
            };
            this.$store
              .dispatch({ type: SIGNUP, signupDetails })
              .then(_ => {
                this.$router.push("/");
              })
              .catch(err => console.log(err));
          });
      });
    },
    onSignInError(error) {
      console.log("OH NOES", error);
    }
  },
  created() {}
};
</script>

 <style lang="scss" scoped>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
  margin: 1em;
  cursor: pointer;
}
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

    .login-btn {
      width: 100%;
    }

    @media (max-width: 700px) {
      width: 80%;
    }
  }
}
</style>
