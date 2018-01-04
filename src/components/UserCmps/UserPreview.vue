<template>
  <section v-if="userToDisplay" class="container">
    <v-avatar class="proflie-img" size="200px">
      <img :src="userToDisplay.img" alt="John">
    </v-avatar>
    <div class="user-details">
      <label class="nick">Nick :  {{userToDisplay.name}}</label>
      <label class="date">Joined {{date}}</label>
      <label class="username">Email :  {{userToDisplay.username}}</label>
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

.container {
  display: flex;
  flex-direction: column;
  padding: 0%;
  background: rgba(230, 230, 230, 0.561);
  border-radius: 10px;
}

.user-details { 
  background: rgba(235, 235, 235, 0.561);//just so you see the text is white!
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: rgba(65, 64, 64, 0.466);
  font-size: 1.5em;
  width: 100%;
  height: 60%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

.proflie-img{
  align-self: center;
  margin: 10px;
}

.nick {
  padding-bottom: 10px;
}
.date {
  padding-bottom: 10px;
}
.username {
  padding-bottom: 10px;
}

@media (max-width: 700px) {
  .container {
    min-height: 400px !important;
  }

  .user-details { 
      height: 40%;
  }
}
</style>