<script>
import coffeeIcon from "@/assets/images/coffee.png";
export default {
  name: "RewardTicket",
  components: {},
  data() {
    return {
      coffeeIcon,
    };
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>

<template>
  <div class="reward-ticket">
    <div class="ticket-content">
      <h2 class="reward-title">Gratis kaffe!</h2>

      <v-img :src="coffeeIcon" width="110" height="110" contain />

      <p class="reward-description">
        <span> Vis denne skærm i caféen for at indløse din gratis kaffe! </span>

        <span>
          Tag en ven eller nabo med, så får I hver en gratis kop kaffe at nyde
          sammen.
        </span>
      </p>

      <v-card class="reward-code">
        <v-card-text>
          <h1>BORROW</h1>

          <p>
            Belønningskode:
            <strong>ABC123</strong>
          </p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<style scoped>
.reward-ticket {
  display: flex;
  justify-content: center;
  width: 100%;
}

.ticket-content {
  width: 100%;
  max-width: 320px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;
}

.reward-title {
  font-size: 30px;
  font-weight: 700;
  margin: 8px 0;
  line-height: 1;
}

.reward-description {
  color: #c2c2c2;
  line-height: 1.5;
  margin-top: 22px;
  margin-bottom: 22px;
}
.reward-code {
  width: 100%;
  padding: 10px 18px;
  border-radius: 18px;
  background: rgba(102, 187, 106, 0.08);
  border: 1px solid rgba(102, 187, 106, 0.45);
  backdrop-filter: blur(8px);
}

.reward-code h1 {
  color: #66bb6a;
  font-size: 30px;
  margin: 10px 0;
  line-height: 1;
}

.reward-code p {
  margin-top: 0;
  margin-bottom: 0;
  color: #c2c2c2;
  font-size: 14px;
}

.reward-code .v-card-text {
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}
</style>
