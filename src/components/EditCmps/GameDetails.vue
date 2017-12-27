<template>
    <section v-if="gameToEditDetails">
        <v-text-field label="Game Title" v-model="gameToEdit.name" :rules="titleRules" required></v-text-field>
        <v-text-field label="Game Description" v-model="gameToEdit.description" :rules="descriptionRules" required></v-text-field>
        <v-card-media src="gameToEdit.img" height="200px">
        </v-card-media>
        <v-text-field label="Image Url" v-model="gameToEdit.img" required></v-text-field>

        <v-checkbox label="Public ?" v-model="gameToEdit.isPublic" required></v-checkbox>

        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs6>
                    <v-subheader>Choose Audience</v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-select v-bind:items="audiences" v-model="gameToEdit.audience" label="Audience" single-line auto append-icon="people" hide-details required></v-select>
                </v-flex>
            </v-layout>
        </v-container>
        <v-btn @click="CL">LOG</v-btn>
        <v-btn @click="cancleClicked">Cancle</v-btn>
        <v-btn @click="nextClicked">Next</v-btn>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                gameToEdit :null , 
                audiences: ['Dicks', 'Cocks'],            
                titleRules: [(v) => !!v || 'Name is required'],
                descriptionRules: [(v) => !!v || 'Description is required'],
            }
        },
        computed: {
            // gameToEdit() {
            //     return this.$store.getters.gameToEdit                
            // }
        },
        methods: {
            CL() {
                console.log('gameToEdit ', this.gameToEdit);
            },
            cancleClicked() {
                this.$router.push('/my-games')
                this.$emit('cancleEdition')
            },
            nextClicked() {
                var updated = {
                    name: this.gameToEdit.name,
                    description: this.gameToEdit.description,
                    img: this.gameToEdit.img,
                    isPublic: this.gameToEdit.isPublic,       
                    audience: this.gameToEdit.audience,                    
                }
                console.log('NEXT CLICKED');
                this.$emit('onDetailschange', updated);
            }
        },
        created(){
            this.gameToEdit = JSON.parse(JSON.stringify(this.gameToEditDetails))
        },
        props: ['gameToEditDetails'],
        
    };
</script>