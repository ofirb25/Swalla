<template>
  <section v-if="userToDisplay" class="container">
    <v-avatar class="proflie-img" size="200px">
      <img :src="userToDisplay.img" alt="John">
    </v-avatar>
    <div class="user-details">
      <label class="nick">Nick :  {{userToDisplay.name}}</label>
      <label class="date">Joined {{date}}</label>
      <label v-if="isLoggedInId === userToDisplay.id" class="username">Email :  {{userToDisplay.username}}</label>
 <doughnut-chart v-if="displayChart"
  :data="datacollection"
  :options="{responsive: true, maintainAspectRatio: true}"
  :width="300"
  :height="300"
  >
 </doughnut-chart>  
 </div>

  </section>
</template>
<script>
import moment from "moment";
import DoughnutChart from "../Chart.js";

export default {
  props: {
    userId: String,
    userToDisplay: Object
  },
  data() {
    return {
      displayChart: false,
      datacollection: null
    };
  },
  computed: {
    date() {
      return moment(+this.userToDisplay.signInDate).fromNow();
    },
    isLoggedInId() {
      return this.$store.getters.loggedinUserId;
    }
  },
  created() {
    setTimeout(() => {
      this.displayChart = true;
      this.datacollection = {
        labels: [
          "played singal",
          "played multi",
          "correct answers",
          "wrong answer"
        ],
        datasets: [
          {
            backgroundColor: ["#f00", "#0f0", "#00f", "#ff0"],
            data: [
              this.userToDisplay.stats.singleGames,
              this.userToDisplay.stats.multiGames,
              0,
              0
            ]
          },
          {
            backgroundColor: ["#f00", "#0f0", "#00f", "#ff0"],
            data: [
              0,
              0,
              this.userToDisplay.stats.correctAns,
              this.userToDisplay.stats.wrongAns
            ]
          }
        ]
      };
    }, 300);
  },
  components: {
    DoughnutChart
  }
};
</script>

<style lang="scss" scoped>
v-avatar {
  display: none;
}

.container {
  display: flex;
  flex-direction: column;
  padding: 0%;
  background: rgba(230, 230, 230, 0.561);
  border-radius: 10px;
  justify-content: flex-start;
}

.user-details {
  background: rgba(235, 235, 235, 0.561); //just so you see the text is white!
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: rgba(65, 64, 64, 0.466);
  font-size: 1.5em;
  width: 100%;
  height: 60%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}

.proflie-img {
  align-self: center;
  margin: 10px;
}

.nick {
  padding-bottom: 10px;
}
.date {
  padding-bottom: 10px;
}
.username {
  padding-bottom: 10px;
}

@media (max-width: 700px) {
  .container {
    min-height: 400px !important;
  }

  .user-details {
    height: 40%;
  }
}
</style>