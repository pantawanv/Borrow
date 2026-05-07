<script>
import { loanService } from "../services/loanService";
export default {
  name: "RequestsPage",
  props: {
    item: Object,
    itemForm: Object,
  },
  components: {},
  data() {
    return {
      loans: [],
    };
  },
  async mounted() {
    await this.fetchLoans();
  },
  computed: {},
  methods: {
    async fetchLoans() {
      try {
        this.loans = await loanService.getAll();
        console.log(this.loans);
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    },
  },
  watch: {},
};
</script>

<template>
  <v-container class="page-container pa-6">
    <h1>Anmodninger</h1>
    <p>Her kan du se og svare på dine låneanmodninger.</p>
    <v-card v-for="loan in loans" :key="loan.id" class="request-card">
      <div class="top-items">
        <!-- TODO:Replace with actual borrower name -->
        <h4>
          Bruger {{ loan.borrowerUserId }}
          <span class="normal-text">vil låne </span>
          <strong>{{ loan.item?.name }}</strong>
        </h4>
        <!-- TODO: Replace with actual status and style accordingly -->
        <v-chip size="small" class="status-chip">{{ loan.status }}</v-chip>
      </div>
      <div class="rating">
        <!-- TODO: Replace with actual rating -->
        <v-rating
          :model-value="4"
          color="green-darken-1"
          density="compact"
          size="small"
          readonly
          half-increments
        />
        <p class="rating-text">Denne bruger er vurderet til 4.2/5 stjerner</p>
      </div>
      <p class="message-text">{{ loan.message }}</p>
      <p class="details-text">
        <v-icon size="18" class="mr-1">mdi-clock-outline</v-icon>
        Ønsket låneperiode: {{ loan.requestedDuration }} dage
      </p>
      <p class="details-text">
        <v-icon size="18" class="mr-1">mdi-calendar</v-icon>
        Ønsket afhentning: {{ loan.requestedPickupDay?.name }} -
        {{ loan.requestedPickupTime?.name }}
      </p>
      <div>
        <v-btn
          color="green-darken-1"
          style="color: black; font-weight: normal"
          class="ma-1 btn-actions"
        >
          <v-icon size="18" class="mr-1">mdi-check</v-icon>
          Acceptér</v-btn
        >
        <v-btn
          color="grey-darken-4"
          style="font-weight: normal"
          class="ma-1 btn-actions"
        >
          <v-icon size="18" class="mr-1">mdi-close</v-icon>
          Afvis</v-btn
        >
        <v-btn
          color="grey-darken-4"
          style="font-weight: normal"
          class="ma-1 btn-actions"
        >
          <v-icon size="18" class="mr-1">mdi-lightbulb-outline</v-icon>
          Foreslå andet
        </v-btn>
      </div>
    </v-card> </v-container
  >1
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 960px) {
  .page-container {
    max-width: 800px;
  }
}

.request-card {
  padding: 16px;
  border-radius: 16px;
  background-color: #141414;
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 22px;
}

.details-text {
  color: #9e9e9e;
  font-size: 12px;
  margin-top: 8px;
}
.top-items {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.top-items h4 {
  flex: 1;
  min-width: 0;

  margin-bottom: 2px;

  white-space: normal;
  overflow-wrap: break-word;
  word-break: break-word;

  line-height: 1.3;
}

.normal-text {
  font-weight: normal;
}
.status-chip {
  flex-shrink: 0;
  align-self: flex-start;
}

.rating {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 4px;
  margin-bottom: 2px;
}

.rating-text {
  color: #9e9e9e;
  font-size: 13px;
  margin-top: 2px;
}

.message-text {
  margin-top: 4px;
  margin-bottom: 8px;
  font-size: 14px;
}
.btn-actions {
  border-radius: 16px;
}
</style>
