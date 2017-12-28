<template>
  <v-form class="login-section" v-model="valid">
    <v-text-field
      label="Name"
      v-model="name"
      :rules="nameRules"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      label="E-mail"
      v-model="email"
      :rules="emailRules"
      required
    ></v-text-field>
    <router-link :to="'/'"><v-btn class="login-btn">Signup</v-btn></router-link>
    
  </v-form>

  
</template>

<script>
export default {
  data() {
    return {
          valid: false,
        name: '',
        nameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ]
      }
    }
  }
  
  
</script>

 <style lang="scss" scoped>

.login-section{
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

    .login-btn{
      width: 100%;
    }
}
</style>
