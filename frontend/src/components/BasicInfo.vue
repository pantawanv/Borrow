<script>
import Stepper from "@/components/Stepper.vue";
export default {
  name: "",
  components: {
    Stepper,
  },
  data() {
    return {
      categories: [
        { id: 1, name: "Værktøj" },
        { id: 2, name: "Køkken" },
        { id: 3, name: "Elektronik" },
        { id: 4, name: "Udendørs" },
        { id: 5, name: "Sport" },
        { id: 6, name: "Transport" },
        { id: 7, name: "Underholdning" },
        { id: 8, name: "Andet" },
      ],
      loanPeriods: [
        { title: "1 dag", value: 1 },
        { title: "3 dage", value: 3 },
        { title: "1 uge", value: 7 },
        { title: "2 uger", value: 14 },
        { title: "1 måned", value: 30 },
      ],
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
    itemForm: Object,
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
      v-model="itemForm.name"
      aria-labelledby="item-title-label"
      placeholder="f.eks. Symaskine"
      rounded="lg"
      density="compact"
      variant="solo"
    />

    <!-- Brand -->
    <h4 id="item-brand-label" class="title-label">Mærke</h4>
    <v-text-field
      v-model="itemForm.brand"
      aria-labelledby="item-brand-label"
      placeholder="f.eks. Singer"
      rounded="lg"
      density="compact"
      variant="solo"
    />

    <!--  Category -->
    <h4 id="item-category-label" class="title-label">Kategori *</h4>
    <v-select
      v-model="itemForm.categoryId"
      :items="categories"
      item-title="name"
      item-value="id"
      aria-labelledby="item-category-label"
      placeholder="Vælg"
      rounded="lg"
      density="compact"
      variant="solo"
    >
    </v-select>

    <!-- Condition  -->
    <h4 id="item-condition-label" class="title-label">Stand *</h4>
    <v-select
      v-model="itemForm.itemCondition"
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
      v-model="itemForm.maxBorrowDays"
      :items="loanPeriods"
      item-title="title"
      item-value="value"
      aria-labelledby="item-loan-period-label"
      placeholder="Vælg"
      rounded="lg"
      density="compact"
      variant="solo"
    >
    </v-select>

    <!-- Description  -->
    <h4 id="item-description-label" class="title-label">Beskrivelse *</h4>
    <v-textarea
      v-model="itemForm.description"
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
            Annuller
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
