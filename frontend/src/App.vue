<script>
import Home from "@/components/Home.vue";
import BasicInfo from "@/components/BasicInfo.vue";
import Stepper from "./components/Stepper.vue";
import Details from "./components/Details.vue";
import ConfirmPage from "./components/ConfirmPage.vue";
import MyItems from "./components/MyItems.vue";
import ItemDetailsPage from "@/components/ItemDetailsPage.vue";
import DiscoverPage from "@/components/DiscoverPage.vue";
import { itemService } from "@/services/itemService.js";
import SuccessDialog from "@/components/SuccessDialog.vue";
import { imageService } from "./services/imageService";

export default {
  name: "App",

  components: {
    Home,
    DiscoverPage,
    BasicInfo,
    Stepper,
    Details,
    ConfirmPage,
    MyItems,
    ItemDetailsPage,
    SuccessDialog,
  },

  data() {
    return {
      currentPage: "home",
      currentStep: 1,
      selectedItem: null,
      editingItemId: null,
      showSuccessDialog: false,
      dialogType: null,
      selectedDeleteId: null,

      itemForm: {
        ownerUserId: 1,
        categoryId: null,
        name: "",
        brand: "",
        itemCondition: "",
        maxBorrowDays: "",
        description: "",
        extraNotes: "",
        status: "Tilgængelig",

        pickupDays: [],
        pickupTimes: [],
        images: [],
      },
    };
  },

  methods: {
    goToHome() {
      this.currentPage = "home";
    },

    goToDiscover() {
      this.currentPage = "discover";
    },

    goToBasicInfo() {
      if (!this.editingItemId) {
        this.resetForm();
      }

      this.currentPage = "basicInfo";
      this.currentStep = 1;
    },

    goToDetails() {
      this.currentPage = "details";
      this.currentStep = 2;
    },

    goToConfirm() {
      this.currentPage = "confirm";
      this.currentStep = 3;
    },

    goToMyItems() {
      this.currentPage = "myItems";
      this.editingItemId = null;
    },

    viewItemDetails(item) {
      this.selectedItem = item;
      this.currentPage = "itemDetails";
    },

    async saveItem() {
      try {
        let itemId;

        // UPDATE existing item
        if (this.editingItemId) {
          await itemService.update(this.editingItemId, {
            ownerUserId: this.itemForm.ownerUserId,
            categoryId: this.itemForm.categoryId,
            name: this.itemForm.name,
            brand: this.itemForm.brand,
            itemCondition: this.itemForm.itemCondition,
            maxBorrowDays: this.itemForm.maxBorrowDays,
            description: this.itemForm.description,
            extraNotes: this.itemForm.extraNotes,
            status: this.itemForm.status,
          });

          await itemService.deletePickupDays(this.editingItemId);
          await itemService.deletePickupTimes(this.editingItemId);

          itemId = this.editingItemId;
        }

        // CREATE new item
        else {
          const created = await itemService.create({
            ownerUserId: this.itemForm.ownerUserId,
            categoryId: this.itemForm.categoryId,
            name: this.itemForm.name,
            brand: this.itemForm.brand,
            itemCondition: this.itemForm.itemCondition,
            maxBorrowDays: this.itemForm.maxBorrowDays,
            description: this.itemForm.description,
            extraNotes: this.itemForm.extraNotes,
            status: this.itemForm.status,
          });

          itemId = created.id;
        }

        // Save pickup days
        for (const dayId of this.itemForm.pickupDays) {
          await itemService.createPickupDay({
            itemId: itemId,
            pickupDayId: dayId,
          });
        }

        // Save pickup times
        for (const timeId of this.itemForm.pickupTimes) {
          await itemService.createPickupTime({
            itemId: itemId,
            pickupTimeId: timeId,
          });
        }

        // Save images
        for (const imageUrl of this.itemForm.images) {
          await imageService.create({
            itemId: itemId,
            imageUrl: imageUrl,
          });
        }

        this.resetForm();

        this.dialogType = this.editingItemId ? "update" : "create";

        this.editingItemId = null;
        this.showSuccessDialog = true;
      } catch (error) {
        console.error("Error saving item:", error);
      }
    },

    resetForm() {
      this.itemForm = {
        ownerUserId: 1,
        categoryId: null,
        name: "",
        brand: "",
        itemCondition: "",
        maxBorrowDays: "",
        description: "",
        extraNotes: "",
        status: "Tilgængelig",

        pickupDays: [],
        pickupTimes: [],
        images: [],
      };
    },

    deleteItem(id) {
      this.selectedDeleteId = id;
      this.dialogType = "delete";
      this.showSuccessDialog = true;
    },

    async confirmDelete() {
      try {
        await itemService.delete(this.selectedDeleteId);

        this.selectedItem = null;
        this.selectedDeleteId = null;

        this.goToMyItems();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },

    async editItem(item) {
      this.editingItemId = item.id;

      const pickupDays = await itemService.getPickupDays(item.id);
      const pickupTimes = await itemService.getPickupTimes(item.id);

      this.itemForm = {
        ownerUserId: item.ownerUserId,
        categoryId: item.categoryId,
        name: item.name,
        brand: item.brand,
        itemCondition: item.itemCondition,
        maxBorrowDays: item.maxBorrowDays,
        description: item.description,
        extraNotes: item.extraNotes,
        status: item.status,
        pickupDays: [],
        pickupTimes: [],
        images: [],
      };

      this.goToBasicInfo();
    },
  },
};
</script>
<template>
  <v-app>
    <v-app-bar class="app-bar">
      <!-- To do: Flyt knapperne senere og fjern div -->
      <div class="top-items">
        <v-toolbar-title @click="currentPage = 'home'">
          Borrow
        </v-toolbar-title>
        <v-btn @click="goToMyItems"> Mine Genstande </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <Home
        v-if="currentPage === 'home'"
        @go-to-basic-info="goToBasicInfo"
        @go-to-discover="goToDiscover"
      />

      <!-- Page navigation -->

      <DiscoverPage v-if="currentPage === 'discover'" />

      <BasicInfo
        v-if="currentPage === 'basicInfo'"
        :currentStep="currentStep"
        :itemForm="itemForm"
        @go-to-details="goToDetails"
        @go-to-my-items="goToMyItems"
      />

      <Details
        v-if="currentPage === 'details'"
        :currentStep="currentStep"
        :itemForm="itemForm"
        @go-to-basic-info="goToBasicInfo"
        @go-to-confirm="goToConfirm"
        @go-to-my-items="goToMyItems"
      />

      <ConfirmPage
        v-if="currentPage === 'confirm'"
        :currentStep="currentStep"
        :itemForm="itemForm"
        @go-to-details="goToDetails"
        @go-to-my-items="goToMyItems"
        @save-item="saveItem"
      />

      <MyItems
        v-if="currentPage === 'myItems'"
        @view-item-details="viewItemDetails"
        @go-to-basic-info="goToBasicInfo"
      />

      <ItemDetailsPage
        v-if="currentPage === 'itemDetails'"
        :item="selectedItem"
        @edit-item="editItem"
        @delete-item="deleteItem"
        @go-to-my-items="goToMyItems"
      />

      <SuccessDialog
        v-model="showSuccessDialog"
        :dialogType="dialogType"
        @go-to-my-items="goToMyItems"
        @confirm-delete="confirmDelete"
      />
    </v-main>
  </v-app>
</template>

<style scoped>
.app-bar {
  background-color: rgb(26, 25, 25);
  color: white;
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
}

.v-toolbar-title {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.top-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
