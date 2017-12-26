<template>
    <section>
        <h1>Home</h1>
        <div class="container">
        <game-list></game-list>
        </div>
    </section>
</template>

<script>
import GameList from '../components/HomeComps/GameList'
export default {
    components : {
        GameList
    }
}
</script>

