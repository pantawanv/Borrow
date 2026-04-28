<script>
import Stepper from "@/components/Stepper.vue";
import SuccessDialog from "./SuccessDialog.vue";
export default {
  name: "",
  components: {
    Stepper,
    SuccessDialog,
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

      showImageDialog: false,
      selectedImage: "",

      errors: {
        name: "",
        categoryId: "",
        itemCondition: "",
        maxBorrowDays: "",
        description: "",
        images: "",
      },
      showExitDialog: false,
      dialogType: "",
    };
  },
  computed: {},
  methods: {
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    handleFiles(event) {
      const files = Array.from(event.target.files);

      files.forEach((file) => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();

        reader.onload = (e) => {
          this.itemForm.images.unshift(e.target.result);
        };

        reader.readAsDataURL(file);
      });
    },
    handleDrop(event) {
      const files = Array.from(event.dataTransfer.files);

      files.forEach((file) => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();

        reader.onload = (e) => {
          this.itemForm.images.unshift(e.target.result);
        };

        reader.readAsDataURL(file);
      });
    },
    removeImage(index) {
      this.itemForm.images.splice(index, 1);
    },
    openImagePreview(img) {
      this.selectedImage = img;
      this.showImageDialog = true;
    },
    validate() {
      let valid = true;

      // Name validation
      if (!this.itemForm.name?.trim()) {
        this.errors.name = "Indtast venligst et navn for genstanden.";
        valid = false;
      } else {
        this.errors.name = "";
      }

      // Category validation
      if (!this.itemForm.categoryId) {
        this.errors.categoryId = "Vælg venligst en kategori.";
        valid = false;
      } else {
        this.errors.categoryId = "";
      }

      // Condition validation
      if (!this.itemForm.itemCondition) {
        this.errors.itemCondition = "Vælg venligst stand for genstanden.";
        valid = false;
      } else {
        this.errors.itemCondition = "";
      }

      // Max borrow days validation
      if (!this.itemForm.maxBorrowDays) {
        this.errors.maxBorrowDays = "Vælg venligst en max låneperiode.";
        valid = false;
      } else {
        this.errors.maxBorrowDays = "";
      }

      // Description validation
      if (!this.itemForm.description?.trim()) {
        this.errors.description =
          "Beskriv venligst genstanden, så låneren ved, hvad de kan forvente.";
        valid = false;
      } else {
        this.errors.description = "";
      }

      // Images validation
      if (this.itemForm.images.length === 0) {
        this.errors.images =
          "Tilføj venligst mindst ét billede af genstanden, så låneren ved, hvad de kan forvente.";
        valid = false;
      } else {
        this.errors.images = "";
      }

      return valid;
    },
    nextStep() {
      if (this.validate()) {
        this.$emit("go-to-details");
      }
    },
    openExitDialog() {
      this.dialogType = this.isEditing ? "exit-edit" : "exit";

      this.showExitDialog = true;
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
  emits: ["go-to-details", "go-to-my-items"],
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

    <p class="text-guide">Udfyld venligst oplysninger om genstanden</p>
    <p class="text-required">Felter markeret med * er påkrævet</p>

    <v-divider class="my-4"></v-divider>

    <!-- Title  -->
    <h4 id="item-title-label" class="title-label">Navn på genstand *</h4>
    <div v-if="errors.name" class="error-text">
      {{ errors.name }}
    </div>
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
    <div v-if="errors.brand" class="error-text">
      {{ errors.brand }}
    </div>

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
    <div v-if="errors.categoryId" class="error-text">
      {{ errors.categoryId }}
    </div>

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
    <div v-if="errors.itemCondition" class="error-text">
      {{ errors.itemCondition }}
    </div>
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
    <div v-if="errors.maxBorrowDays" class="error-text">
      {{ errors.maxBorrowDays }}
    </div>
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
    <div v-if="errors.description" class="error-text">
      {{ errors.description }}
    </div>
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
    <h4 class="title-label">Billeder *</h4>
    <div v-if="errors.images" class="error-text">
      {{ errors.images }}
    </div>
    <v-card
      class="upload-card"
      flat
      @click="openFileDialog"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <div class="image-content">
        <v-icon size="48">mdi-camera-plus</v-icon>
        <p>Tryk her for at tilføje billeder</p>
      </div>

      <input
        ref="fileInput"
        type="file"
        multiple
        accept="image/*"
        style="display: none"
        @change="handleFiles"
      />
    </v-card>

    <!-- Preview -->
    <v-carousel
      v-if="itemForm.images.length"
      hide-delimiters
      height="260"
      class="mt-4 rounded-lg"
      :show-arrows="itemForm.images.length > 1"
    >
      <v-carousel-item v-for="(img, index) in itemForm.images" :key="index">
        <v-img
          :src="img"
          cover
          height="260"
          class="clickable-image"
          @click="openImagePreview(img)"
        />
        <div class="carousel-actions">
          <v-btn
            icon
            color="red"
            size="small"
            class="delete-image-btn"
            @click.stop="removeImage(index)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-carousel-item>
    </v-carousel>

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
            @click="nextStep"
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
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: grey;
}

.upload-card {
  border: 2px dashed grey;
  min-height: 160px;
  cursor: pointer;
  border-radius: 16px;
}

.preview-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.preview-box {
  position: relative;
  width: 120px;
}

.delete-image-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.carousel-actions {
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}

.clickable-image {
  cursor: pointer;
}

.error-text {
  color: rgb(202, 20, 20);
  font-size: 14px;
  margin-top: -16px;
  margin-bottom: 8px;
}
</style>
