<template>
    <section>
        <div class="container">
            <my-game-list class="list-componenet"></my-game-list>
        </div>
    </section>
</template>

<script>
import MyGameList from "../components/AdminCmps/MyGameList";

export default {
  components: {
    MyGameList
  }
};
</script>
<style lang="scss" scoped>
    .list-componenet {
        max-width: 50%;
    }
</style>
