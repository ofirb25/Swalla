<template>
    <div :style="loader" class="loader"></div>
</template>
<script>
export default {
  props: {
    timeLimit: Number
  },
  data() {
    return {
      val: 100
    };
  },
  computed: {
    loader() {
      return { height: "20px", width: `${this.val}%`, background: "red" };
    }
  },
  created() {
    var interval = setInterval(() => {
      this.val--;
      if (this.val === 0) {
        clearInterval(interval);
        this.$emit("done");
      }
    }, this.timeLimit / 100);
  }
};
</script>
<style lang="scss" scoped>
.loader {
  transition: all 60ms;
}
</style>

