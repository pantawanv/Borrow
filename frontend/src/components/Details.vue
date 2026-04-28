<script>
import Stepper from "@/components/Stepper.vue";
import SuccessDialog from "@/components/SuccessDialog.vue";
export default {
  name: "",
  components: {
    Stepper,
    SuccessDialog,
  },
  data() {
    return {
      pickupDayOptions: [
        { id: 1, name: "Mandag" },
        { id: 2, name: "Tirsdag" },
        { id: 3, name: "Onsdag" },
        { id: 4, name: "Torsdag" },
        { id: 5, name: "Fredag" },
        { id: 6, name: "Lørdag" },
        { id: 7, name: "Søndag" },
      ],
      pickupTimeOptions: [
        { id: 1, name: "Morgen (8-12)" },
        { id: 2, name: "Middag (12-17)" },
        { id: 3, name: "Aften (17-21)" },
        { id: 4, name: "Nat (21+)" },
      ],
      errors: {
        pickupDays: "",
        pickupTimes: "",
      },
      showExitDialog: false,
      dialogType: "",
    };
  },
  computed: {},
  methods: {
    openExitDialog() {
      this.dialogType = this.isEditing ? "exit-edit" : "exit";
      this.showExitDialog = true;
    },
    toggleDay(id) {
      const index = this.itemForm.pickupDays.indexOf(id);

      if (index === -1) {
        this.itemForm.pickupDays.push(id);
      } else {
        this.itemForm.pickupDays.splice(index, 1);
      }
    },

    toggleTime(id) {
      const index = this.itemForm.pickupTimes.indexOf(id);

      if (index === -1) {
        this.itemForm.pickupTimes.push(id);
      } else {
        this.itemForm.pickupTimes.splice(index, 1);
      }
    },

    validate() {
      let isValid = true;

      if (this.itemForm.pickupDays.length === 0) {
        this.errors.pickupDays = "Vælg mindst én foretrukken afhentningsdag.";
        isValid = false;
      } else {
        this.errors.pickupDays = "";
      }

      if (this.itemForm.pickupTimes.length === 0) {
        this.errors.pickupTimes = "Vælg mindst én foretrukken afhentningstid.";
        isValid = false;
      } else {
        this.errors.pickupTimes = "";
      }

      return isValid;
    },
  },
  watch: {},
  props: {
    currentStep: {
      type: Number,
      default: 1,
    },
    itemForm: Object,
    isEditing: Boolean,
  },
  emits: ["go-to-basic-info", "go-to-confirm", "go-to-my-items"],
};
</script>

<template>
  <v-container class="pa-6" max-width="600" pb="120px">
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="text-center font-weight-bold">
        Opret ny genstand
      </v-toolbar-title>
      <v-icon @click="openExitDialog">mdi-close</v-icon>
    </v-toolbar>

    <Stepper :currentStep="currentStep" />
    <p class="text-guide">
      Tilføj ekstra oplysninger om genstanden og ønskede afhentningstider
    </p>
    <p class="text-extra-info">Felter markeret med * er påkrævet</p>

    <v-divider class="my-4"></v-divider>

    <!-- Preferred pick up day -->
    <p id="item-preferred-pick-up-day-label" class="title-label">
      Foretrukne afhentningsdage *
    </p>
    <div v-if="errors.pickupDays" class="error-text">
      {{ errors.pickupDays }}
    </div>
    <p class="text-extra-info">Hvilke dage passer bedst for afhentning?</p>
    <div role="group" aria-labelledby="item-preferred-pick-up-day-label">
      <v-row>
        <v-col cols="12">
          <v-btn
            v-for="day in pickupDayOptions"
            :key="day.id"
            class="pickup-btn"
            :class="{ selected: itemForm.pickupDays.includes(day.id) }"
            @click="toggleDay(day.id)"
            :aria-pressed="itemForm.pickupDays.includes(day.id)"
          >
            {{ day.name }}
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- Preferred pick up time -->
    <p id="item-preferred-pick-up-time-label" class="title-label">
      Foretrukne afhentningstider *
    </p>
    <div v-if="errors.pickupTimes" class="error-text">
      {{ errors.pickupTimes }}
    </div>
    <p class="text-extra-info">Hvornår på dagen passer bedst?</p>
    <div role="group" aria-labelledby="item-preferred-pick-up-time-label">
      <v-row>
        <v-col cols="12">
          <v-btn
            v-for="time in pickupTimeOptions"
            :key="time.id"
            class="pickup-btn"
            :class="{
              selected: itemForm.pickupTimes.includes(time.id),
            }"
            @click="toggleTime(time.id)"
            :aria-pressed="itemForm.pickupTimes.includes(time.id)"
          >
            {{ time.name }}
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- Extra information -->
    <h4 id="item-extra-info-label" class="title-label">
      Ekstra noter eller instruktioner
    </h4>
    <v-textarea
      v-model="itemForm.extraNotes"
      aria-labelledby="item-extra-info-label"
      placeholder="Specielle instruktioner til låneren? F.eks. 'Returnér venligst med opladet batteri'"
      rounded="lg"
      density="compact"
      variant="solo"
      rows="4"
    />

    <!-- Tip -->
    <v-card>
      <v-card-text class="text-tip">
        <v-icon left color="yellow-darken-2">mdi-lightbulb-on</v-icon>
        Tip: At angive klare afhentningspræferencer reducerer frem og
        tilbage-beskeder og gør det nemmere for både dig og låneren at finde et
        passende afhentningstidspunkt.
      </v-card-text>
    </v-card>

    <!-- Back and next buttons  -->
    <div class="bottom-bar">
      <v-row justify="center" align="center">
        <v-col cols="6">
          <v-btn block color="grey-darken-4" @click="$emit('go-to-basic-info')">
            Tilbage
          </v-btn>
        </v-col>

        <v-col cols="6">
          <v-btn
            block
            color="green-lighten-1"
            class="text-black"
            @click="validate() && $emit('go-to-confirm')"
          >
            Næste
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <SuccessDialog
    v-model="showExitDialog"
    :dialog-type="dialogType"
    @go-to-my-items="$emit('go-to-my-items')"
  />
</template>

<style scoped>
.v-toolbar-title {
  font-size: 25px;
}

.title-label {
  font-weight: normal;
  margin-top: 2px;
}

.text-guide {
  font-weight: normal;
  margin: 0;
}

.text-extra-info,
.text-tip {
  color: #757575;
  font-style: italic;
}

.title-label {
  font-weight: normal;
  margin-top: 22px;
}

:deep(.v-textarea textarea::placeholder) {
  font-size: 14px;
}

.pickup-btn {
  background-color: #424242;
  border: 2px solid #212121;
  color: white;
  font-weight: normal;
  min-width: 100px;
  border-radius: 16px;
  box-shadow: none;
  padding: 4px 2px 4px 2px;
  margin: 2px 2px 2px 2px;
}

.selected {
  background-color: #4caf50;
  border-color: #388e3c;
}

.bottom-bar {
  padding: 16px;
  display: flex;
  gap: 12px;
}
.text-black {
  color: black;
}

.error-text {
  color: rgb(202, 20, 20);
  font-size: 14px;
  margin-top: -16px;
  margin-bottom: 8px;
}
</style>
