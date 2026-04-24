<script>
import Stepper from "@/components/Stepper.vue";
export default {
  name: "",
  components: {
    Stepper,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    toggleDay(day) {
      const index = this.itemForm.pickupDays.indexOf(day);

      if (index === -1) {
        this.itemForm.pickupDays.push(day);
      } else {
        this.itemForm.pickupDays.splice(index, 1);
      }
    },

    toggleTime(time) {
      const index = this.itemForm.pickupTimes.indexOf(time);

      if (index === -1) {
        this.itemForm.pickupTimes.push(time);
      } else {
        this.itemForm.pickupTimes.splice(index, 1);
      }
    },
  },
  watch: {},
  props: {
    currentStep: {
      type: Number,
      default: 1,
    },
    itemForm: Object,
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
      <v-icon @click="$emit('go-to-my-items')">mdi-close</v-icon>
    </v-toolbar>

    <Stepper :currentStep="currentStep" />
    <p class="text-guide">
      Tilføj ekstra oplysninger om genstanden og ønskede afhentningstider
    </p>
    <p class="text-extra-info">
      Fortsæt til næste trin, hvis det ikke er relevant
    </p>

    <v-divider class="my-4"></v-divider>

    <!-- Preferred pick up day -->
    <p id="item-preferred-pick-up-day-label" class="title-label">
      Foretrukne afhentningsdage
    </p>
    <p class="text-extra-info">Hvilke dage passer bedst for afhentning?</p>
    <div role="group" aria-labelledby="item-preferred-pick-up-day-label">
      <v-row>
        <v-col cols="12">
          <v-btn
            class="pickup-btn"
            :class="{ selected: itemForm.pickupDays.includes('Mandag') }"
            @click="toggleDay('Mandag')"
            :aria-pressed="itemForm.pickupDays.includes('Mandag')"
            >Mandag</v-btn
          >
          <v-btn
            class="pickup-btn"
            :class="{ selected: itemForm.pickupDays.includes('Tirsdag') }"
            @click="toggleDay('Tirsdag')"
            :aria-pressed="itemForm.pickupDays.includes('Tirsdag')"
            >Tirsdag</v-btn
          >
          <v-btn
            class="pickup-btn"
            :class="{ selected: itemForm.pickupDays.includes('Onsdag') }"
            @click="toggleDay('Onsdag')"
            :aria-pressed="itemForm.pickupDays.includes('Onsdag')"
            >Onsdag</v-btn
          >
          <v-btn
            class="pickup-btn"
            :class="{ selected: itemForm.pickupDays.includes('Torsdag') }"
            @click="toggleDay('Torsdag')"
            :aria-pressed="itemForm.pickupDays.includes('Torsdag')"
            >Torsdag</v-btn
          >
          <v-btn
            class="pickup-btn"
            :class="{ selected: itemForm.pickupDays.includes('Fredag') }"
            @click="toggleDay('Fredag')"
            :aria-pressed="itemForm.pickupDays.includes('Fredag')"
            >Fredag</v-btn
          >
          <v-btn
            class="pickup-btn"
            :class="{ selected: itemForm.pickupDays.includes('Lørdag') }"
            @click="toggleDay('Lørdag')"
            :aria-pressed="itemForm.pickupDays.includes('Lørdag')"
            >Lørdag</v-btn
          >
          <v-btn
            class="pickup-btn"
            :class="{ selected: itemForm.pickupDays.includes('Søndag') }"
            @click="toggleDay('Søndag')"
            :aria-pressed="itemForm.pickupDays.includes('Søndag')"
            >Søndag</v-btn
          >
        </v-col>
      </v-row>
    </div>

    <!-- Preferred pick up time -->
    <p id="item-preferred-pick-up-time-label" class="title-label">
      Foretrukne afhentningstider
    </p>
    <p class="text-extra-info">Hvornår på dagen passer bedst?</p>
    <div role="group" aria-labelledby="item-preferred-pick-up-time-label">
      <v-row>
        <v-col cols="12">
          <v-btn
            class="pickup-btn"
            :class="{
              selected: itemForm.pickupTimes.includes('Morgen (8-12)'),
            }"
            @click="toggleTime('Morgen (8-12)')"
            :aria-pressed="itemForm.pickupTimes.includes('Morgen (8-12)')"
            >Morgen (8-12)</v-btn
          >
          <v-btn
            class="pickup-btn"
            :class="{
              selected: itemForm.pickupTimes.includes('Middag (12-17)'),
            }"
            @click="toggleTime('Middag (12-17)')"
            :aria-pressed="itemForm.pickupTimes.includes('Middag (12-17)')"
            >Middag (12-17)</v-btn
          >
          <v-btn
            class="pickup-btn"
            :class="{
              selected: itemForm.pickupTimes.includes('Aften (17-21)'),
            }"
            @click="toggleTime('Aften (17-21)')"
            :aria-pressed="itemForm.pickupTimes.includes('Aften (17-21)')"
            >Aften (17-21)</v-btn
          >
          <v-btn
            class="pickup-btn"
            :class="{ selected: itemForm.pickupTimes.includes('Nat (21+)') }"
            @click="toggleTime('Nat (21+)')"
            :aria-pressed="itemForm.pickupTimes.includes('Nat (21+)')"
            >Nat (21+)</v-btn
          >
        </v-col>
      </v-row>
    </div>

    <!--  <h4>Har genstanden ekstra tilbehør?</h4>
    <v-row>
      <v-col cols="12">
        <v-btn class="pickup-btn"> Ja </v-btn>
        <v-btn class="pickup-btn"> Nej </v-btn>
      </v-col>
    </v-row> -->

    <!-- <v-row v-if="hasExtra === true">
      <v-col cols="12">
        <div class="tags_wrapper" v-if="extrasList.length">
          <span class="tag" v-for="(extra, index) in extrasList" :key="index">
            {{  extra  }}
            <button class="remove_tag" @click="removeExtra(index)">×</button>
          </span>

        </div>

        <div class="input_wrapper">
          <input
          type= "text"
            placeholder="F.eks. oplader, taske..."
            v-model="extraName"
            class="custom_input"
            @keyup.enter="addExtra"
          ></input>

          <v-btn class="add_button" icon @click="addExtra"> + </v-btn>
        </div>
        <div v-if="errors.extrasList" class="error-text">{{ errors.extrasList }}</div>
      </v-col>
    </v-row>
 -->

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
        tilbage-beskeder og gør det nemmere for låneren.
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
            @click="$emit('go-to-confirm')"
          >
            Næste
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
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

.text-extra-info {
  color: #757575;
  font-style: italic;
}

.text-tip {
  color: #757575;
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
</style>
