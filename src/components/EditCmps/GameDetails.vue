<template>
    <section>
        <v-text-field label="Game Title" v-model="gameToEdit.name" :rules="titleRules" required @input="changeDetails"></v-text-field>
        <v-text-field label="Game Description" v-model="gameToEdit.description" :rules="descriptionRules" @input="changeDetails" required></v-text-field>
        <v-card-media :src="gameToEdit.img" height="200px">
        </v-card-media>
        <v-text-field label="Image Url" v-model="gameToEdit.img" required @input="changeDetails" ></v-text-field>
        <v-checkbox label="Public ?" v-model="gameToEdit.isPublic" required @input="changeDetails"></v-checkbox>
        <v-container fluid>
            <v-layout row wrap>
                <v-flex xs6>
                    <v-subheader>Choose Audience</v-subheader>
                </v-flex>
                <v-flex xs6>
                    <v-select v-bind:items="audiences" @input="changeDetails" v-model="gameToEdit.audience" label="Audience" single-line auto append-icon="people" hide-details required></v-select>
                </v-flex>
            </v-layout>
        </v-container>
        <v-btn @click="cancleClicked">Cancle</v-btn>
        <v-btn @click="changeDetails">Next</v-btn>
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
            cancleClicked() {
                this.$router.push('/my-games')
                this.$emit('cancleEdition')
            },
            changeDetails() {
                var updated = {
                    name: this.gameToEdit.name,
                    description: this.gameToEdit.description,
                    img: this.gameToEdit.img,
                    isPublic: this.gameToEdit.isPublic,       
                    audience: this.gameToEdit.audience,                       
                }
                this.$emit('onDetailschange', updated);
            }
        },
        created(){
            this.gameToEdit = JSON.parse(JSON.stringify(this.gameDetails))
        },
        props: ['gameDetails'],
        
    };
</script>

 <style lang="scss" scoped>

</style>