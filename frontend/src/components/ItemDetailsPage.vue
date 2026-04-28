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
      selectedStatus: null,
      showImageDialog: false,
      selectedImage: "",
      currentImageIndex: 0,
      showToast: false,
    };
  },
  async mounted() {
    this.selectedStatus = this.item.status;
    await this.loadRelations();
  },
  methods: {
    async loadRelations() {
      this.pickupDays = await itemService.getPickupDays(this.item.id);
      this.pickupTimes = await itemService.getPickupTimes(this.item.id);
    },
    async updateStatus() {
      try {
        await itemService.update(this.item.id, {
          ...this.item,
          status: this.selectedStatus,
        });

        this.item.status = this.selectedStatus;
        this.showToast = true;
      } catch (error) {
        console.error("Error updating status:", error);
      }
    },
    openImagePreview(img) {
      this.selectedImage = img;
      this.showImageDialog = true;
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
    isStatusChanged() {
      return this.selectedStatus !== this.item.status;
    },
    mainImage() {
      return this.item.images?.length
        ? this.item.images[0].imageUrl
        : this.imagePlaceholder;
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
      <div v-if="item.images?.length" class="image-count">
        <v-icon size="16">mdi-camera</v-icon>
        {{ currentImageIndex + 1 }} / {{ item.images.length }}
      </div>
      <v-carousel
        v-if="item.images?.length"
        v-model="currentImageIndex"
        class="item-image"
        hide-delimiters
        :show-arrows="item.images.length > 1 ? 'hover' : false"
        height="280"
      >
        <v-carousel-item v-for="(img, index) in item.images" :key="index">
          <v-img
            :src="img.imageUrl"
            contain
            height="280"
            class="clickable-image"
            @click="openImagePreview(img.imageUrl)"
          />
        </v-carousel-item>
      </v-carousel>
      <v-img v-else class="item-image" :src="imagePlaceholder" cover />
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

          <div class="status-row">
            <v-select
              v-model="selectedStatus"
              aria-labelledby="item-admin-label"
              rounded="lg"
              density="compact"
              variant="solo"
              class="select-status"
              :items="['Tilgængelig', 'Udlånt', 'Inaktiv']"
              hide-details
            />

            <v-btn
              color="green-darken-1"
              class="save-status-btn"
              :disabled="!isStatusChanged"
              @click="updateStatus"
            >
              Gem
            </v-btn>
            <v-snackbar
              v-model="showToast"
              location="top"
              timeout="3000"
              color="green-darken-1"
            >
              Status opdateret!
            </v-snackbar>
          </div>
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
          <v-btn @click="$emit('delete-item', item.id)" color="#2a2a2a">
            <v-icon>mdi-delete-outline</v-icon>
            Slet
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-container>
  <v-dialog v-model="showImageDialog" max-width="900">
    <v-card>
      <v-img :src="selectedImage" contain max-height="80vh" />

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="showImageDialog = false"> Luk </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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

.status-row,
.btn-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.select-status :deep(.v-field),
.save-status-btn,
.edit-btn,
.delete-btn {
  height: 36px;
  border-radius: 10px;
}

.select-status {
  max-width: 200px;
}

.save-status-btn {
  min-width: 100px;
}

.edit-btn,
.delete-btn {
  min-width: 120px;
}

.select-status :deep(input::placeholder) {
  color: white;
  opacity: 1;
}

.select-status :deep(.v-field) {
  background-color: #2a2a2a;
}

.clickable-image {
  cursor: zoom-in;
}

.image-count {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
