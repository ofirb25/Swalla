<template>
    <section v-if="question">
        <time-bar :timeLimit="2500" @done="prevDone"></time-bar>
        <div class="content">
             <h1 class="display-2">
                {{question.title}}
             </h1>
        </div>
   
    </section>
</template>

<script>
import TimeBar from "./TimeBar";
export default {
  data() {
    return {
    
    };
  },
  methods: {
    prevDone() {
      this.$emit("prevDone");
    }
  },
  components: {
    TimeBar
  },
  props : {
    question : Object
  }
};
</script>

<style lang="scss" scoped>
.content {
    height:90vh;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
}
</style>
