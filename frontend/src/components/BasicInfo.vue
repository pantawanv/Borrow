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

    <p class="text-guide">Udfyld venligst oplysninger om genstanden</p>
    <p class="text-required">Felter markeret med * er påkrævet</p>

    <v-divider class="my-4"></v-divider>

    <!-- Title  -->
    <h4 id="item-title-label" class="title-label">Navn på genstand *</h4>
    <v-text-field
      aria-labelledby="item-title-label"
      placeholder="f.eks. Symaskine"
      rounded="lg"
      density="compact"
      variant="solo"
    />

    <!-- Brand -->
    <h4 id="item-brand-label" class="title-label">Mærke</h4>
    <v-text-field
      aria-labelledby="item-brand-label"
      placeholder="f.eks. Singer"
      rounded="lg"
      density="compact"
      variant="solo"
    />

    <!--  Category -->
    <h4 id="item-category-label" class="title-label">Kategori *</h4>
    <v-select
      aria-labelledby="item-category-label"
      placeholder="Vælg"
      rounded="lg"
      density="compact"
      variant="solo"
      :items="[
        'Værktøj',
        'Køkken',
        'Elektronik',
        'Udendørs',
        'Sport',
        'Transport',
        'Underholdning',
        'Andet',
      ]"
    >
    </v-select>

    <!-- Condition  -->
    <h4 id="item-condition-label" class="title-label">Stand *</h4>
    <v-select
      aria-labelledby="item-condition-label"
      placeholder="Vælg"
      rounded="lg"
      density="compact"
      variant="solo"
      :items="['Ny', 'Som ny', 'God', 'Rimelig', 'Slidt']"
    >
    </v-select>

    <!-- Max loan period -->
    <h4 id="item-loan-period-label" class="title-label">Max låneperiode *</h4>
    <v-select
      aria-labelledby="item-loan-period-label"
      placeholder="Vælg"
      rounded="lg"
      density="compact"
      variant="solo"
      :items="['1 dag', '3 dage', '1 uge', '2 uger', '1 måned']"
    >
    </v-select>

    <!-- Description  -->
    <h4 id="item-description-label" class="title-label">Beskrivelse *</h4>
    <v-textarea
      aria-labelledby="item-description-label"
      placeholder="Beskriv genstanden, og evt. om den kommer med ekstra tilbehør."
      rounded="lg"
      density="compact"
      variant="solo"
      rows="4"
    />

    <!--  Pictures -->
    <h4 id="item-pictures-label" class="title-label">Billeder *</h4>
    <v-card>
      <v-card-text
        class="d-flex align-center justify-center"
        style="height: 150px"
      >
        <div class="image-content">
          <v-icon size="48" color="grey">mdi-camera-plus</v-icon>
          <p>Klik for at tilføje billeder</p>
        </div>
      </v-card-text>
    </v-card>

    <!-- Back and next buttons  -->
    <div class="bottom-bar">
      <v-row justify="center" align="center">
        <v-col cols="6">
          <v-btn block color="grey-darken-4" @click="$emit('go-to-my-items')">
            Anuller
          </v-btn>
        </v-col>

        <v-col cols="6">
          <v-btn
            block
            color="green-lighten-1"
            class="text-black"
            @click="$emit('go-to-details')"
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
}

.text-required {
  color: #757575;
  font-style: italic;
}

:deep(.v-textarea textarea::placeholder) {
  font-size: 14px;
}

.bottom-bar {
  padding: 16px;
  display: flex;
  gap: 12px;
}

.text-black {
  color: black;
}

.image-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
