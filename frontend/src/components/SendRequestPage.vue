<script>
import SuccessDialog from "./SuccessDialog.vue";
export default {
  name: "SendRequestPage",
  props: {
    item: Object,
  },
  components: {
    SuccessDialog,
  },
  data() {
    return {
      showExitDialog: false,
      dialogType: "",
    };
  },
  computed: {
    mainImage() {
      return this.item.images?.length
        ? this.item.images[0].imageUrl
        : this.imagePlaceholder;
    },
  },
  methods: {
    openExitDialog() {
      this.dialogType = "exit-request";
      this.showExitDialog = true;
    },
  },
  watch: {},
  emits: ["go-to-discover"],
};
</script>

<template>
  <v-container class="pa-6" max-width="600">
    <div class="close-btn-wrapper">
      <v-icon @click="openExitDialog">mdi-close</v-icon>
    </div>
    <h1>Anmod om at låne</h1>
    <p>
      Send en låneanmodning til (udlåner-navn) ved at udfylde felterne nedenfor.
    </p>
    <v-card class="item-preview">
      <div class="card-content">
        <div class="image-wrapper">
          <img :src="mainImage" :alt="item.name" class="item-image" />
        </div>

        <div class="item-info">
          <v-card-title class="pa-0">
            {{ item.name }}
          </v-card-title>

          <p class="item-details">
            {{ item.brand || "Ukendt mærke" }} • {{ item.categoryId }}
          </p>

          <p class="pickup-info">
            📆Fortrukne afhentningsdage: {{ item.pickupDays }}
          </p>

          <p class="pickup-info">
            ⏰Fortrukne afhentningstider: {{ item.pickupTimes }}
          </p>
        </div>
      </div>
    </v-card>

    <!-- Loan period selection -->
    <h4 class="title-text">Ønsket låneperiode *</h4>

    <v-select
      arialabelledby="loan-period-label"
      placeholder="Hvor længe vil du låne?"
      rounded="lg"
      density="compact"
      variant="solo"
    >
    </v-select>

    <!-- Pickup day selection -->
    <h4 class="title-text">Ønsket afhentningsdag *</h4>

    <v-select
      arialabelledby="pickup-day-label"
      placeholder="Vælg dag for afhentning"
      rounded="lg"
      density="compact"
      variant="solo"
    >
    </v-select>

    <!-- Pickup time selection -->
    <h4 class="title-text">Ønsket afhentningstid *</h4>

    <v-select
      arialabelledby="pickup-time-label"
      placeholder="Vælg tid for afhentning"
      rounded="lg"
      density="compact"
      variant="solo"
    >
    </v-select>

    <!-- Message to lender -->
    <h4 id="item-message-label" class="title-text">
      Din besked til udlåneren *
    </h4>

    <v-textarea
      aria-labelledby="item-message-label"
      placeholder="Skriv en besked til udlåneren, hvor du fortæller lidt om dig selv og hvorfor du gerne vil låne genstanden."
      rounded="lg"
      density="compact"
      variant="solo"
      rows="5"
      class="message"
    />

    <v-btn block color="green-lighten-1" style="color: black">
      Send anmodning
    </v-btn>

    <SuccessDialog
      v-model="showExitDialog"
      :dialogType="dialogType"
      @go-to-my-items="$emit('go-to-discover')"
    />
  </v-container>
</template>

<style scoped>
.item-preview {
  padding: 16px;
  border-radius: 16px;
  background-color: #141414;
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 22px;
}

.card-content {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background-color: #141414;
}

.image-wrapper {
  width: 110px;
  height: 110px;
  border-radius: 22px;
  overflow: hidden;
  background-color: #141414;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image {
  width: 110%;
  height: 110%;
  object-fit: contain;
  padding: 6px;

  border-radius: 22px;

  transition: 0.2s ease;
}

.item-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.item-details {
  color: #9e9e9e;
  margin: 2px 0;
  font-size: 14px;
}

.pickup-info {
  margin: 2px 0;
  font-size: 13px;
  color: #9e9e9e;
}

.title-text {
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: normal;
}

.close-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}
</style>
