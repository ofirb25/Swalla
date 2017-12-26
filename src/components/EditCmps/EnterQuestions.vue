<template>
    <section v-if="gameToEdit">        
        <v-btn @click="CL">LOG</v-btn>
        <v-btn @click="cancleClicked">Cancle</v-btn>
        <v-btn @click="">Save</v-btn>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                gameAudience: null,
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
            }
        }
    };
</script>