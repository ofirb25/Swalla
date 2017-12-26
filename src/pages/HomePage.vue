<template>
    <section class="games-section">
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

<style>
.games-section{
    display:flex;
    justify-content: center;
}
</style>

