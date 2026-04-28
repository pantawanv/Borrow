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
      showImageDialog: false,
      selectedImage: "",
      currentImageIndex: 0,
      showDialog: false,
      dialogType: null,
    };
  },
  computed: {
    categoryLabel() {
      const map = {
        1: "Værktøj",
        2: "Køkken",
        3: "Elektronik",
        4: "Udendørs",
        5: "Sport",
        6: "Transport",
        7: "Underholdning",
        8: "Andet",
      };
      return map[this.itemForm.categoryId] || "Ukendt";
    },
    loanLabel() {
      const map = {
        1: "1 dag",
        3: "3 dage",
        7: "1 uge",
        14: "2 uger",
        30: "1 måned",
      };
      return map[this.itemForm.maxBorrowDays] || "";
    },
    pickupDaysLabel() {
      const map = {
        1: "Mandag",
        2: "Tirsdag",
        3: "Onsdag",
        4: "Torsdag",
        5: "Fredag",
        6: "Lørdag",
        7: "Søndag",
      };
      return this.itemForm.pickupDays.map((id) => map[id]).join(", ");
    },
    pickupTimesLabel() {
      const map = {
        1: "Morgen (8-12)",
        2: "Middag (12-17)",
        3: "Aften (17-21)",
        4: "Nat (21+)",
      };
      return this.itemForm.pickupTimes.map((id) => map[id]).join(", ");
    },
    mainImage() {
      return this.itemForm.images?.length
        ? this.itemForm.images[0]
        : this.imagePlaceholder;
    },
  },
  methods: {
    openImagePreview(img) {
      this.selectedImage = img;
      this.showImageDialog = true;
    },
    openExitDialog() {
      this.dialogType = this.isEditing ? "exit-edit" : "exit";

      this.showDialog = true;
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
  emits: ["go-to-details", "go-to-my-items", "save-item"],
};
</script>

<template>
  <v-container class="pa-6" max-width="600">
    <v-toolbar flat color="transparent">
      <v-toolbar-title class="text-center font-weight-bold">
        {{ isEditing ? "Opdater genstand" : "Opret ny genstand" }}
      </v-toolbar-title>
      <v-icon @click="openExitDialog">mdi-close</v-icon>
    </v-toolbar>

    <Stepper :currentStep="currentStep" />

    <p class="text-guide">Tjek om alle oplysninger er korrekte</p>
    <v-divider class="my-4"></v-divider>

    <!-- Inner card -->
    <v-card class="item-preview">
      <div v-if="itemForm.images?.length" class="image-count">
        <v-icon size="16">mdi-camera</v-icon>
        {{ currentImageIndex + 1 }} / {{ itemForm.images.length }}
      </div>
      <v-carousel
        v-if="itemForm.images?.length"
        v-model="currentImageIndex"
        class="item-image"
        hide-delimiters
        :show-arrows="itemForm.images.length > 1 ? 'hover' : false"
        height="280"
      >
        <v-carousel-item v-for="(img, index) in itemForm.images" :key="index">
          <v-img
            :src="img"
            contain
            height="280"
            class="clickable-image"
            @click="openImagePreview(img)"
          />
        </v-carousel-item>
      </v-carousel>

      <v-img v-else class="item-image" :src="imagePlaceholder" cover />
      <v-card-title class="item-title">{{ itemForm.name }}</v-card-title>
      <v-card-subtitle class="item-subtitle">{{
        itemForm.brand
      }}</v-card-subtitle>
      <v-divider class="my-2" />
      <div class="info-list">
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-tag</v-icon>
            Kategori</span
          >
          <span class="value">{{ categoryLabel }}</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-star-half-full</v-icon>
            Stand</span
          >
          <span class="value">{{ itemForm.itemCondition }}</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-clock-outline</v-icon>
            Maks. Låneperiode</span
          >
          <span class="value">{{ loanLabel }}</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-calendar-month</v-icon>
            Foretrukne afhentningsdage</span
          >
          <span class="value">{{ pickupDaysLabel }}</span>
        </div>
        <div class="info-row">
          <span class="label">
            <v-icon>mdi-sun-clock-outline</v-icon>
            Foretrukne afhentningstider</span
          >
          <span class="value">{{ pickupTimesLabel }}</span>
        </div>
        <div class="text-section">
          <p class="section-title">Beskrivelse</p>
          <p class="text-content truncated">
            {{ itemForm.description }}
          </p>
        </div>
        <div class="text-section">
          <p class="section-title">Ekstra oplysninger</p>
          <p class="text-content truncated">
            {{ itemForm.extraNotes }}
          </p>
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
            @click="$emit('save-item')"
          >
            Bekræft
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>

  <!-- Image dialog -->
  <v-dialog v-model="showImageDialog" max-width="900">
    <v-card>
      <v-img :src="selectedImage" contain max-height="80vh" />

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="showImageDialog = false"> Luk </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <SuccessDialog
    v-model="showDialog"
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

.clickable-image {
  cursor: zoom-in;
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

.image-count {
  position: absolute;
  top: 20px;
  right: 20px;
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
