<script>
import placeholder from "@/assets/images/placeholder.jpg";
import deleteIcon from "@/assets/images/delete.png";
import editIcon from "@/assets/images/edit.png";
import { itemService } from "@/services/itemService";

export default {
  name: "",
  components: {},
  data() {
    return {
      imagePlaceholder: placeholder,
      deleteIcon: deleteIcon,
      editIcon: editIcon,
      pickupDays: [],
      pickupTimes: [],
    };
  },
  async mounted() {
    await this.loadRelations();
  },
  methods: {
    async loadRelations() {
      this.pickupDays = await itemService.getPickupDays(this.item.id);
      this.pickupTimes = await itemService.getPickupTimes(this.item.id);
    },
  },
  computed: {
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
  watch: {},
  emits: ["go-to-my-items", "edit-item", "delete-item"],
  props: {
    item: Object,
  },
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
          {{ item.name }}
        </v-card-title>

        <v-chip size="small">{{ item.status }}</v-chip>
      </div>
      <v-card-subtitle class="item-subtitle pa-0">{{
        item.brand
      }}</v-card-subtitle>
      <v-card-subtitle class="item-subtitle pa-0"
        >Antal Gange Udlånt: TO DO</v-card-subtitle
      >
      <v-divider class="my-2" />
      <div class="info-list">
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-tag</v-icon>
            Kategori
          </span>
          <span class="value"> {{ categoryName }}</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-star-half-full</v-icon>
            Stand</span
          >
          <span class="value"> {{ item.itemCondition }}</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-clock-outline</v-icon>
            Maks. Låneperiode</span
          >
          <span class="value"> {{ item.maxBorrowDays }} dage</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-calendar-month</v-icon>
            Foretrukne afhentningsdage</span
          >
          <span class="value">
            {{ pickupDays.map((day) => day.name).join(", ") }}</span
          >
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-sun-clock-outline</v-icon>
            Foretrukne afhentningstider</span
          >
          <span class="value">
            {{ pickupTimes.map((time) => time.name).join(", ") }}</span
          >
        </div>
        <div class="text-section">
          <p class="section-title">Beskrivelse</p>
          <p class="text-content">
            {{ item.description }}
          </p>
        </div>
        <div class="text-section">
          <p class="section-title">Ekstra oplysninger</p>
          <p class="text-content">{{ item.extraNotes }}</p>
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
          <v-btn
            @click="$emit('edit-item', item)"
            color="#2a2a2a"
            class="edit-btn"
          >
            <v-icon>mdi-pencil-outline</v-icon>
            Rediger
          </v-btn>
          <v-btn
            @click="$emit('delete-item', item.id)"
            color="#2a2a2a"
            class="delete-btn"
          >
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
