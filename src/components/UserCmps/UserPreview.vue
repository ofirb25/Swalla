<template>
  <section v-if="userToDisplay" class="container">
    <v-avatar size="200px">
      <img :src="userToDisplay.img" alt="John">
    </v-avatar>
    <div class="user-details">
      <label class="nick">Nick :  {{userToDisplay.name}}</label>
      <label class="date">Joined At : {{date}}</label>
      <label class="username">UserName :  {{userToDisplay.username}}</label>
    </div>
  </section>
</template>
<script>
import moment from "moment";
export default {
  props: {
    userId: String,
    userToDisplay: Object
  },
  computed: {
    date() {
      return moment(+this.userToDisplay.signInDate).fromNow();
    }
  },
  created() {
    console.log(this.userToDisplay);
  }
};
</script>

<style lang="scss" scoped>
v-avatar {
  display: none;
}
.user-details { 
  background: lightseagreen;//just so you see the text is white!
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.5em;
}
.container {
  display: flex;
  flex-direction: column;
}
.nick {
  padding-top: 20px;
  padding-bottom: 10px;
}
.date {
  padding-left: 40px;
  padding-bottom: 10px;
}
.username {
  padding-left: 80px;
  padding-bottom: 10px;
}
</style>