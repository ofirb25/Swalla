<template>
   <v-card>
        <v-card-media
          class="white--text"
          height="200px"
          :src="game.img"
        >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline"></span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <v-card-title>
          <div>
            <span class="grey--text">{{game.name}}</span><br>
            <span>Whitehaven Beach</span><br>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn flat color="orange"><i class="fa fa-trash"></i></v-btn>
          <v-btn flat color="orange">Explore</v-btn>
        </v-card-actions>
      </v-card>
</template>
<script>
    import { LOAD_GAMES } from "../modules/GamesModule";

    export default {
        props : {
            game : Object
        }
        
    }
</script>