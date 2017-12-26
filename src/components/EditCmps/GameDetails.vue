<template>
    <section v-if="gameToEdit">
        <v-text-field label="Game Title" v-model="gameToEdit.name" :rules="titleRules" required></v-text-field>
        <v-text-field label="Game Description" v-model="gameToEdit.description" :rules="descriptionRules" required></v-text-field>
        <v-checkbox label="Public ?" v-model="isPublic"></v-checkbox>

        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs6>
                    <v-subheader>Choose Audience</v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-select v-bind:items="audiences" v-model="gameAudience" label="Audience" single-line auto append-icon="people" hide-details></v-select>
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
                gameAudience: null,
                audiences: ['Dicks', 'Cocks'],
                isPublic: true,
                titleRules: [(v) => !!v || 'Name is required'],
                descriptionRules: [(v) => !!v || 'Description is required'],
            }
        },
        computed: {
            gameToEdit() {
                return this.$store.getters.gameToEdit                
            }
        },
        methods:{
            CL(){
                console.log('gameToEdit ', this.gameToEdit);
            },
            cancleClicked(){
                this.$router.push('/my-games')
                this.$emit('cancleEdition')
            },
            nextClicked(){
                console.log('NEXT CLICKED');
                this.$emit('switchComp')
            }
        }
    };
</script>