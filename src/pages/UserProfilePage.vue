<template>
    <section>
        <div class="container">
            <user-preview></user-preview>
            <my-game-list class="list-componenet"></my-game-list>
        </div>
    </section>
</template>

<script>
import MyGameList from "../components/AdminCmps/MyGameList";
import  UserPreview from '../components/UserCmps/UserPreview';

export default {
  components: {
    MyGameList, 
    UserPreview
  }
};
</script>
<style lang="scss" scoped>
    .list-componenet {
        max-width: 50%
    }
    .container{
        display: flex;
        flex-direction: row;
    }
</style>
