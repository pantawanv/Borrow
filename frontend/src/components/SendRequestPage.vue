<script>
import SuccessDialog from "./SuccessDialog.vue";
import { itemService } from "@/services/itemService.js";
import { loanService } from "../services/loanService";
export default {
  name: "SendRequestPage",
  props: {
    item: Object,
    itemForm: Object,
  },
  components: {
    SuccessDialog,
  },
  data() {
    return {
      showExitDialog: false,
      showDialog: false,
      dialogType: null,
      availablePickupDays: [],
      availablePickupTimes: [],
      selectedPickupDay: null,
      selectedPickupTime: null,
      selectedLoanPeriod: null,
      message: "",

      errors: {
        maxBorrowDays: "",
        pickupDays: "",
        pickupTimes: "",
        message: "",
      },
      //TODO: Fetch loan periods based on owners preferences - for now we just hardcode some options
      loanPeriods: [
        { title: "1 dag", value: 1 },
        { title: "3 dage", value: 3 },
        { title: "1 uge", value: 7 },
        { title: "2 uger", value: 14 },
        { title: "1 måned", value: 30 },
      ],
    };
  },
  computed: {
    mainImage() {
      return this.item.images?.length
        ? this.item.images[0].imageUrl
        : this.imagePlaceholder;
    },
    categoryName() {
      const categories = {
        1: "Værktøj",
        2: "Køkken",
        3: "Elektronik",
        4: "Udendørs",
        5: "Sport",
        6: "Transport",
        7: "Underholdning",
        8: "Andet",
      };
      return categories[this.item.categoryId] || "Ukendt";
    },
  },
  async mounted() {
    await this.loadRelations();
  },
  methods: {
    openExitDialog() {
      this.dialogType = "exit-request";
      this.showExitDialog = true;
    },
    async loadRelations() {
      this.availablePickupDays =
        (await itemService.getPickupDays(this.item.id)) || [];

      this.availablePickupTimes =
        (await itemService.getPickupTimes(this.item.id)) || [];
    },
    validate() {
      let valid = true;

      //Borrow period validation
      if (!this.selectedLoanPeriod) {
        this.errors.maxBorrowDays = "Vælg venligst en låneperiode";
        valid = false;
      } else {
        this.errors.maxBorrowDays = "";
      }

      //Pickup days validation
      if (!this.selectedPickupDay) {
        this.errors.pickupDays = "Vælg venligst en dag for afhentning";
        valid = false;
      } else {
        this.errors.pickupDays = "";
      }

      //Pickup times validation
      if (!this.selectedPickupTime) {
        this.errors.pickupTimes = "Vælg venligst en tid for afhentning";
        valid = false;
      } else {
        this.errors.pickupTimes = "";
      }

      //Message validation
      if (!this.message) {
        this.errors.message = "Skriv venligst en besked til udlåneren";
        valid = false;
      } else {
        this.errors.message = "";
      }

      return valid;
    },
    async sendRequest() {
      if (!this.validate()) {
        return;
      }

      try {
        await loanService.create({
          itemId: this.item.id,
          borrowerUserId: 1, //TODO: Replace with actual user id
          requestedDuration: this.selectedLoanPeriod,
          requestedPickupDayId: this.selectedPickupDay,
          requestedPickupTimeId: this.selectedPickupTime,
          message: this.message,
        });
        console.log("Loan request sent successfully");
        this.dialogType = "request-sent";
        this.showExitDialog = true;
      } catch (error) {
        console.error("Error sending loan request:", error);
      }
    },
  },
  watch: {},
  emits: ["go-to-discover"],
};
</script>

<template>
  <v-container class="request-container pa-6">
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
            {{ item.brand || "Ukendt mærke" }} • {{ categoryName }}
          </p>

          <p class="pickup-info">
            📆Fortrukne afhentningsdage:
            {{ availablePickupDays.map((day) => day.name).join(", ") }}
          </p>

          <p class="pickup-info">
            ⏰Fortrukne afhentningstider:
            {{ availablePickupTimes.map((time) => time.name).join(", ") }}
          </p>
        </div>
      </div>
    </v-card>

    <!-- Loan period selection -->
    <h4 id="loan-period-label" class="title-text">Ønsket låneperiode *</h4>
    <div v-if="errors.maxBorrowDays" class="error-text">
      {{ errors.maxBorrowDays }}
    </div>

    <v-select
      v-model="selectedLoanPeriod"
      :items="loanPeriods"
      item-title="title"
      item-value="value"
      aria-labelledby="loan-period-label"
      placeholder="Hvor længe vil du låne?"
      rounded="lg"
      density="compact"
      variant="solo"
    >
    </v-select>

    <!-- Pickup day selection -->
    <h4 id="pickup-day-label" class="title-text">Ønsket afhentningsdag *</h4>
    <div v-if="errors.pickupDays" class="error-text">
      {{ errors.pickupDays }}
    </div>

    <v-select
      v-model="selectedPickupDay"
      :items="availablePickupDays"
      item-title="name"
      item-value="id"
      aria-labelledby="pickup-day-label"
      placeholder="Vælg dag for afhentning"
      rounded="lg"
      density="compact"
      variant="solo"
    >
    </v-select>

    <!-- Pickup time selection -->
    <h4 id="pickup-time-label" class="title-text">Ønsket afhentningstid *</h4>
    <div v-if="errors.pickupTimes" class="error-text">
      {{ errors.pickupTimes }}
    </div>

    <v-select
      v-model="selectedPickupTime"
      :items="availablePickupTimes"
      item-title="name"
      item-value="id"
      aria-labelledby="pickup-time-label"
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
    <div v-if="errors.message" class="error-text">
      {{ errors.message }}
    </div>

    <v-textarea
      v-model="message"
      aria-labelledby="item-message-label"
      placeholder="Skriv en besked til udlåneren, hvor du fortæller lidt om dig selv og hvorfor du gerne vil låne genstanden."
      rounded="lg"
      density="compact"
      variant="solo"
      rows="5"
      class="message"
    />

    <v-btn
      block
      color="green-lighten-1"
      style="color: black; font-weight: normal"
      @click="sendRequest"
    >
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

.request-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 960px) {
  .request-container {
    max-width: 800px;
  }
}

.error-text {
  color: rgb(202, 20, 20);
  font-size: 14px;
  margin-top: -16px;
  margin-bottom: 8px;
}
</style>
