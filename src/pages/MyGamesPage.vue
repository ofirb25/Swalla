<template>
    <section>
        <h1>My Games Page</h1>
        <div class="container">
            

            <div class="controlsContainer">
                <v-text-field label="Search">
                </v-text-field>


                <div :absolute="true" :value="true" :active.sync="e1" color="transparent">
                    <v-btn flat color="teal" value="recent">
                        <span>Recent</span>
                        <v-icon>history</v-icon>
                    </v-btn>
                    <v-btn flat color="teal" value="favorites">
                        <span>Favorites</span>
                        <v-icon>favorite</v-icon>
                    </v-btn>
                    <v-btn flat color="teal" value="nearby">
                        <span>Nearby</span>
                        <v-icon>place</v-icon>
                    </v-btn>
                </div>
            </div>
            <v-btn fab dark color="indigo">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </v-btn>



        </div>
    </section>
</template>

<script>
    // import GameList from '../components/GameList'
    export default {
        data() {
            return {
                filterOps: ['New', 'Holiday', 'School'],
                e1: 'recent'
            }
        },
        methods: {

        },
        components: {}
    };
</script>