<template>
  <section v-if="userToDisplay" class="container">
    <v-avatar size="200px">
      <img :src="userToDisplay.img" alt="John">
    </v-avatar>
    <label>Nick :  </label><label>{{userToDisplay.name}}</label>
    <label>UserName :  </label><label>{{userToDisplay.username}}</label>    
  </section>
</template>
<script>

export default {
  props: {
    userId: String,
    userToDisplay: Object
  }
};
</script>

<style lang="scss" scoped>
.list-componenet {
  max-width: 50%;
}
.container {
  display: flex;
  flex-direction: column;
}
</style>