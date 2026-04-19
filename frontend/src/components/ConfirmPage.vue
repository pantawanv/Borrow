<script>
import Stepper from "@/components/Stepper.vue";
import placeholder from "@/assets/images/placeholder.jpg";
import SuccessDialog from "@/components/SuccessDialog.vue";

export default {
  name: "",
  components: {
    Stepper,
    SuccessDialog,
  },
  data() {
    return {
      imagePlaceholder: placeholder,
      showSuccessDialog: false,
    };
  },
  computed: {},
  methods: {},
  watch: {},
  props: {
    currentStep: {
      type: Number,
      default: 1,
    },
  },
  emits: ["go-to-details", "go-to-my-items"],
};
</script>

<template>
  <v-container class="pa-6" max-width="600">
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="text-center font-weight-bold">
        Opret ny genstand
      </v-toolbar-title>
      <v-icon @click="$emit('go-to-my-items')">mdi-close</v-icon>
    </v-toolbar>

    <Stepper :currentStep="currentStep" />

    <p class="text-guide">Tjek om alle oplysninger er korrekte</p>
    <v-divider class="my-4"></v-divider>

    <!-- Inner card -->
    <v-card class="item-preview">
      <v-img class="item-image" :src="imagePlaceholder" cover />
      <v-card-title class="item-title">Højtryksrenser</v-card-title>
      <v-card-subtitle class="item-subtitle">Kärcher</v-card-subtitle>
      <v-divider class="my-2" />
      <div class="info-list">
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-tag</v-icon>
            Kategori</span
          >
          <span class="value">Værktøj</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-star-half-full</v-icon>
            Stand</span
          >
          <span class="value">God</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-clock-outline</v-icon>
            Maks. Låneperiode</span
          >
          <span class="value">3 dage</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-calendar-month</v-icon>
            Foretrukne afhentningsdage</span
          >
          <span class="value">Mandag, tirsdag</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-sun-clock-outline</v-icon>
            Foretrukne afhentningstider</span
          >
          <span class="value">Aften</span>
        </div>
        <div class="text-section">
          <p class="section-title">Beskrivelse</p>
          <p class="text-content truncated">
            Højtryksrenser fra Kärcher til rengøring af terrasser, biler og
            meget mere.
          </p>
        </div>
        <div class="text-section">
          <p class="section-title">Ekstra oplysninger</p>
          <p class="text-content truncated">Har forskellige dysehoveder</p>
        </div>
      </div>
    </v-card>

    <p>
      Ser det godt ud? Tryk "Bekræft" for at udgive, eller gå tilbage for at
      redigere.
    </p>

    <!-- Back and next buttons  -->
    <div class="bottom-bar">
      <v-row justify="center" align="center">
        <v-col cols="6">
          <v-btn block color="grey-darken-4" @click="$emit('go-to-details')">
            Tilbage
          </v-btn>
        </v-col>

        <v-col cols="6">
          <v-btn
            block
            color="green-lighten-1"
            class="text-black"
            @click="showSuccessDialog = true"
          >
            Bekræft
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
  <SuccessDialog
    v-model="showSuccessDialog"
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

.bottom-bar {
  padding: 16px;
  display: flex;
  gap: 12px;
}

.text-black {
  color: black;
}

.item-preview {
  padding: 14px;
  border-radius: 14px;
}

.item-image {
  border-radius: 12px;
  margin: 12px 0;
  height: 280px;
}

.item-title {
  font-size: 20px;
  padding: 2px 2px 2px 2px;
  font-weight: bold;
}

.item-subtitle {
  font-size: 13px;
  margin-top: -4px;
  padding: 2px 2px 2px 2px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 8px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
}

.text-section {
  margin-top: 16px;
  padding: 12px;
  background-color: #181717;
  border-radius: 12px;
}

.section-title {
  font-size: 12px;
  color: #9e9e9e;
  margin-bottom: 6px;
}

.text-content {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-line;
}

.truncated {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.label {
  color: #bdbaba;
}
.value {
  font-weight: 500;
}
</style>
