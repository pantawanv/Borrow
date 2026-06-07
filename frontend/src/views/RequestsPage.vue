<script>
import { loanService } from "@/services/loanService";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import RespondBox from "@/components/RespondBox.vue";
export default {
  name: "RequestsPage",
  props: {
    item: Object,
    itemForm: Object,
    currentUserId: Number,
  },
  components: {
    ConfirmDialog,
    RespondBox,
  },
  data() {
    return {
      loans: [],
      selectedTab: "received",
      selectedFilter: "Afventende",
      filters: ["Afventende", "Igangværende", "Tidligere"],
      showDialog: false,
      dialogType: null,
      showRespondBox: false,
      selectedLoan: null,
    };
  },
  async mounted() {
    await this.fetchLoans();
  },
  computed: {
    filteredLoans() {
      let result = [];

      if (this.selectedTab === "received") {
        result = this.loans.filter(
          (loan) => loan.item?.ownerUserId === this.currentUserId,
        );
      }

      if (this.selectedTab === "sent") {
        result = this.loans.filter(
          (loan) => loan.borrowerUserId === this.currentUserId,
        );
      }

      if (this.selectedFilter === "Afventende") {
        return result.filter((loan) => loan.status === "Anmodet");
      }

      if (this.selectedFilter === "Igangværende") {
        return result.filter((loan) => loan.status === "Godkendt");
      }

      if (this.selectedFilter === "Tidligere") {
        return result.filter(
          (loan) =>
            loan.pickupStatus === "Returneret" ||
            loan.status === "Afvist" ||
            loan.status === "Annulleret",
        );
      }

      return result;
    },
    filterCounts() {
      const userLoans = this.loans.filter(
        (loan) => loan.item?.ownerUserId === this.currentUserId,
      );

      return {
        Afventende: userLoans.filter((loan) => loan.status === "Anmodet")
          .length,

        Igangværende: userLoans.filter((loan) => loan.status === "Godkendt")
          .length,

        Tidligere: userLoans.filter(
          (loan) =>
            loan.pickupStatus === "Returneret" ||
            loan.status === "Afvist" ||
            loan.status === "Annulleret",
        ).length,
      };
    },
    receivedCount() {
      return this.loans.filter(
        (loan) => loan.item?.ownerUserId === this.currentUserId,
      ).length;
    },
    sentCount() {
      return this.loans.filter(
        (loan) => loan.borrowerUserId === this.currentUserId,
      ).length;
    },
  },
  methods: {
    async fetchLoans() {
      try {
        this.loans = await loanService.getAll();

        console.log("Current user:", this.currentUserId);

        this.loans.forEach((loan) => {
          console.log({
            loanId: loan.id,
            borrowerId: loan.borrowerUserId,
            itemOwnerId: loan.item?.ownerUserId,
            itemName: loan.item?.name,
          });
        });
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    },
    async acceptLoan(loan) {
      try {
        await loanService.update(loan.id, {
          ...loan,
          status: "Godkendt",
          pickupStatus: "Afventer afhentning",
        });

        loan.status = "Godkendt";
        loan.pickupStatus = "Afventer afhentning";

        this.dialogType = "request-accepted";
        this.showDialog = true;

        await this.fetchLoans();
      } catch (error) {
        console.error("Error accepting loan:", error);
      }
    },
    async declineLoan(loan) {
      try {
        await loanService.update(loan.id, {
          ...loan,
          status: "Afvist",
        });

        loan.status = "Afvist";

        this.dialogType = "decline-request";
        this.showDialog = true;

        await this.fetchLoans();
      } catch (error) {
        console.error("Error declining loan:", error);
      }
    },
    cancelLoan(loan) {
      this.selectedLoan = loan;

      this.dialogType = "cancel-loan";

      this.showDialog = true;
    },
    async confirmCancelLoan() {
      try {
        await loanService.update(this.selectedLoan.id, {
          ...this.selectedLoan,
          status: "Annulleret",
        });

        this.selectedLoan.status = "Annulleret";

        this.showDialog = false;

        await this.fetchLoans();
      } catch (error) {
        console.error("Error cancelling loan:", error);
      }
    },
    async suggestAlternative(loan) {
      this.selectedLoan = loan;
      this.showRespondBox = true;
    },
    async handleSuggestion(suggestionText) {
      console.log("Received suggestion:", suggestionText);
    },
    async confirmPickup(loan) {
      try {
        await loanService.update(loan.id, {
          ...loan,
          pickupStatus: "Ude til udlån",
        });

        loan.pickupStatus = "Ude til udlån";
        this.dialogType = "pickup-confirmed";
        this.showDialog = true;

        await this.fetchLoans();
      } catch (error) {
        console.error("Error confirming pickup:", error);
      }
    },
  },
  watch: {},
};
</script>

<template>
  <v-container class="page-container pa-6">
    <h1>Anmodninger</h1>
    <p>Her kan du se dine modtagne og sendte låneanmodninger.</p>
    <div class="tabs-wrapper">
      <v-tabs v-model="selectedTab" hide-slider grow class="custom-tabs">
        <v-tab value="received" class="custom-tab">
          Modtaget ({{ receivedCount }})
        </v-tab>

        <v-tab value="sent" class="custom-tab"> Sendt ({{ sentCount }})</v-tab>
      </v-tabs>
    </div>
    <div class="filter-btn-group">
      <v-btn
        v-for="filter in filters"
        :key="filter"
        rounded="xl"
        @click="selectedFilter = filter"
        :color="selectedFilter === filter ? 'green-lighten-1' : 'grey-darken-3'"
        :class="selectedFilter === filter ? 'text-black' : ''"
      >
        {{ filter }} ({{ filterCounts[filter] }})
      </v-btn>
    </div>
    <v-card v-for="loan in filteredLoans" :key="loan.id" class="request-card">
      <div class="top-items">
        <h4 v-if="selectedTab === 'received'">
          {{ loan.borrower?.firstName }}
          {{ loan.borrower?.lastName }}
          <span class="normal-text">vil låne </span>
          <strong>{{ loan.item?.name }}</strong>
        </h4>

        <h4 v-else>
          Du vil låne
          <strong>{{ loan.item?.name }}</strong>
        </h4>
        <!-- TODO: Replace with actual status and style accordingly -->
        <div class="chip-group">
          <v-chip size="small" class="status-chip">{{ loan.status }}</v-chip>
          <v-chip
            v-if="loan.pickupStatus"
            size="small"
            color="yellow-darken-2"
            class="status-chip"
            >{{ loan.pickupStatus }}</v-chip
          >
        </div>
      </div>
      <div class="rating">
        <!-- TODO: Replace with actual rating -->
        <v-rating
          :model-value="4"
          color="green-lighten-1"
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
        Ønsket afhentning: {{ loan.requestedPickupDay?.name }} •
        {{ loan.requestedPickupTime?.name }}
      </p>
      <div v-if="selectedTab === 'received'">
        <v-btn
          v-if="loan.status === 'Anmodet'"
          color="green-lighten-1"
          style="color: black; font-weight: normal"
          class="ma-1 btn-actions"
          @click="acceptLoan(loan)"
        >
          <v-icon size="18" class="mr-1">mdi-check</v-icon>
          Acceptér
        </v-btn>

        <v-btn
          color="red-darken-1"
          style="font-weight: normal"
          class="ma-1 btn-actions"
          @click="
            loan.status === 'Godkendt' ? cancelLoan(loan) : declineLoan(loan)
          "
        >
          <v-icon size="18" class="mr-1">mdi-close</v-icon>
          {{ loan.status === "Godkendt" ? "Anuller" : "Afvis" }}
        </v-btn>

        <v-btn
          color="grey-darken-4"
          style="font-weight: normal"
          class="ma-1 btn-actions"
          @click="suggestAlternative(loan)"
        >
          <v-icon size="18" class="mr-1">mdi-lightbulb-outline</v-icon>
          Foreslå andet
        </v-btn>
      </div>

      <div v-else>
        <v-btn
          v-if="
            loan.pickupStatus !== 'Ude til udlån' &&
            loan.pickupStatus !== 'Returneret'
          "
          color="red-darken-1"
          style="font-weight: normal"
          class="ma-1 btn-actions"
        >
          <v-icon size="18" class="mr-1">mdi-close</v-icon>
          Annullér anmodning
        </v-btn>
        <v-btn
          v-if="
            loan.status === 'Godkendt' &&
            loan.pickupStatus === 'Afventer afhentning'
          "
          color="green-lighten-1"
          style="color: black; font-weight: normal"
          class="ma-1 btn-actions"
          @click="confirmPickup(loan)"
        >
          <v-icon size="18" class="mr-1"
            >mdi-package-variant-closed-check</v-icon
          >
          Bekræft afhentning
        </v-btn>
      </div>
    </v-card>
    <ConfirmDialog
      v-model="showDialog"
      :dialogType="dialogType"
      @confirm-cancel-loan="confirmCancelLoan"
    />
    <RespondBox v-model="showRespondBox" @send-suggestion="handleSuggestion" />
  </v-container>
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

.chip-group {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
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

.filter-btn-group {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.filter-btn-group .v-btn {
  font-weight: normal;
}

.text-black {
  color: black;
}

.tabs-wrapper {
  background-color: #1f1f1f;
  border-radius: 14px;
  padding: 3px;
  margin-bottom: 20px;
}

.custom-tabs {
  width: 100%;
}

.custom-tab {
  min-height: 36px;
  border-radius: 10px;
  text-transform: none;
  font-weight: 500;
  color: #9e9e9e;
}

.custom-tab.v-tab--selected {
  background-color: #121212;
  color: white;
}
</style>
