<script>
import placeholder from "@/assets/images/placeholder.jpg";
import deleteIcon from "@/assets/images/delete.png";
import editIcon from "@/assets/images/edit.png";
export default {
  name: "",
  components: {},
  data() {
    return {
      imagePlaceholder: placeholder,
      deleteIcon: deleteIcon,
      editIcon: editIcon,
    };
  },
  computed: {},
  methods: {},
  watch: {},
  emits: ["go-to-my-items"],
};
</script>

<template>
  <v-container class="pa-6" max-width="600">
    <v-card class="item-preview">
      <div class="d-flex justify-end">
        <v-icon @click="$emit('go-to-my-items')">mdi-close</v-icon>
      </div>
      <v-img class="item-image" :src="imagePlaceholder" cover />
      <div class="top-text">
        <v-card-title class="item-title pa-0">
          Navn på genstand her
        </v-card-title>

        <v-chip size="small">Status</v-chip>
      </div>
      <v-card-subtitle class="item-subtitle pa-0">Mærke her</v-card-subtitle>
      <v-card-subtitle class="item-subtitle pa-0"
        >Antal Gange Udlånt: 3</v-card-subtitle
      >
      <v-divider class="my-2" />
      <div class="info-list">
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-tag</v-icon>
            Kategori
          </span>
          <span class="value"> Værktøj</span>
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
          <p class="text-content">
            Højtryksrenser fra Kärcher til rengøring af terrasser, biler og
            meget mere.
          </p>
        </div>
        <div class="text-section">
          <p class="section-title">Ekstra oplysninger</p>
          <p class="text-content">Har forskellige dysehoveder</p>
        </div>
        <v-divider class="my-2" />
        <!-- To do - skift placeholder tekst baseret på genstandens status (tilgængelig, udlånt, reserveret) -->
        <div>
          <p id="item-admin-label">Administrer genstand</p>
          <v-select
            aria-labelledby="item-admin-label"
            placeholder="Tilgængelig"
            rounded="lg"
            density="compact"
            variant="solo"
            class="select-status"
            :items="['Tilgængelig', 'Udlånt', 'Inaktiv']"
          >
          </v-select>
        </div>
        <div class="btn-actions">
          <v-btn color="#2a2a2a" class="edit-btn">
            <v-icon>mdi-pencil-outline</v-icon>
            Rediger
          </v-btn>
          <v-btn color="#2a2a2a" class="delete-btn">
            <v-icon>mdi-delete-outline</v-icon>
            Slet
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.top-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  font-weight: bold;
}

.item-subtitle {
  font-size: 13px;
  margin-top: -4px;
}

.item-title,
.item-subtitle {
  padding: 2px;
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

.label {
  color: #bdbaba;
}
.value {
  font-weight: 500;
}

.select-status {
  max-width: 200px;
}

.select-status :deep(input::placeholder) {
  color: white;
  opacity: 1;
}

.select-status :deep(.v-field) {
  background-color: #2a2a2a;
}

.btn-actions {
  display: flex;
  gap: 12px;
}

.edit-btn {
}
.delete-btn {
  color: red;
}
</style>
