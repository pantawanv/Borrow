<script>
import Home from "@/components/Home.vue";
import BasicInfo from "@/components/BasicInfo.vue";
import Stepper from "@/components/Stepper.vue";
import Details from "@/components/Details.vue";
import ConfirmPage from "@/components/ConfirmPage.vue";
import MyItems from "@/components/MyItems.vue";
import ItemDetailsPage from "@/components/ItemDetailsPage.vue";
import DiscoverPage from "@/components/DiscoverPage.vue";
import { itemService } from "@/services/itemService.js";
import SuccessDialog from "@/components/SuccessDialog.vue";
import { imageService } from "@/services/imageService.js";
import SendRequestPage from "@/components/SendRequestPage.vue";
import RequestsPage from "@/components/RequestsPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import { auth } from "@/firebase";
import { userService } from "@/services/userService.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import Profile from "./components/Profile.vue";

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
    SendRequestPage,
    RequestsPage,
    LoginPage,
    RegisterPage,
    Profile,
  },

  data() {
    return {
      currentPage: "login",
      currentStep: 1,
      selectedItem: null,
      editingItemId: null,
      showSuccessDialog: false,
      dialogType: null,
      selectedDeleteId: null,
      currentUser: null,
      backendUser: null,

      itemForm: {
        ownerUserId: null,
        categoryId: null,
        name: "",
        brand: "",
        itemCondition: "",
        maxBorrowDays: null,
        description: "",
        extraNotes: "",
        status: "Tilgængelig",

        pickupDays: [],
        pickupTimes: [],
        message: "",
        images: [],
      },

      userForm: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phoneNumber: "",
      },
    };
  },
  mounted() {
    onAuthStateChanged(auth, async (user) => {
      this.currentUser = user;

      if (user) {
        this.backendUser = await userService.getByFirebaseUid(user.uid);
      }
    });
  },

  methods: {
    goToHome() {
      this.currentPage = "home";
    },

    goToDiscover() {
      this.currentPage = "discover";
    },

    goToBasicInfo(reset = false) {
      if (reset) {
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

    goToSendRequest() {
      this.currentPage = "sendRequest";
    },

    goToRequests() {
      this.currentPage = "requests";
    },
    goToRegister() {
      this.currentPage = "register";
    },
    goToLogin() {
      this.currentPage = "login";
    },
    goToProfile() {
      this.currentPage = "profile";
    },

    async saveItem() {
      try {
        let itemId;

        // UPDATE existing item
        if (this.editingItemId) {
          await itemService.update(this.editingItemId, {
            ownerUserId: this.backendUser?.id,
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

          await imageService.deleteByItemId(this.editingItemId);

          itemId = this.editingItemId;
        }

        // CREATE new item
        else {
          const created = await itemService.create({
            ownerUserId: this.backendUser.id,
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
        ownerUserId: this.backendUser?.id,
        categoryId: null,
        name: "",
        brand: "",
        itemCondition: "",
        maxBorrowDays: null,
        description: "",
        extraNotes: "",
        status: "Tilgængelig",

        pickupDays: [],
        pickupTimes: [],
        message: "",
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
        pickupDays: pickupDays.map((day) => day.id),
        pickupTimes: pickupTimes.map((time) => time.id),
        images: item.images?.map((img) => img.imageUrl) || [],
      };

      this.goToBasicInfo();
    },
    async saveUser() {
      try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.userForm.email,
          this.userForm.password,
        );

        // Get Firebase UID
        const firebaseUid = userCredential.user.uid;

        // Save user in backend database
        await userService.create({
          firebaseUid: firebaseUid,
          firstName: this.userForm.firstName,
          lastName: this.userForm.lastName,
          email: this.userForm.email,
          address: this.userForm.address,
          phoneNumber: this.userForm.phoneNumber,
        });

        this.userForm = {
          firstName: "",
          lastName: "",
          address: "",
          phoneNumber: "",
          email: "",
          password: "",
          confirmPassword: "",
        };

        console.log("User registered and saved to database");
      } catch (error) {
        console.error("Error creating user:", error);
        console.error("Error details:", error.response?.data || error.message);
      }
    },
  },
};
</script>
<template>
  <v-app>
    <v-app-bar class="app-bar">
      <!-- TODO: Flyt knapperne og fjern div -->
      <div class="top-items">
        <div class="left-items">
          <v-toolbar-title @click="currentPage = 'home'">
            Borrow
          </v-toolbar-title>

          <v-btn @click="goToMyItems"> Mine Genstande </v-btn>
        </div>

        <div class="right-items">
          <v-btn variant="text" @click="goToRequests">
            <v-icon class="mr-1">mdi-bell-outline</v-icon>
            <span>Anmodninger</span>
          </v-btn>

          <v-btn variant="text" @click="goToProfile">
            <v-icon class="mr-1">mdi-account-outline</v-icon>
            <span>Profil</span>
          </v-btn>
        </div>
      </div>
    </v-app-bar>
    <v-main>
      <Home
        v-if="currentPage === 'home'"
        @go-to-basic-info="goToBasicInfo(true)"
        @go-to-discover="goToDiscover"
        @go-to-requests="goToRequests"
      />

      <!-- Page navigation -->

      <DiscoverPage
        v-if="currentPage === 'discover'"
        :currentUserId="backendUser?.id"
        @view-item-details="viewItemDetails"
      />

      <RequestsPage
        v-if="currentPage === 'requests'"
        :item="selectedItem"
        :itemForm="itemForm"
        :currentUserId="backendUser?.id"
      />

      <BasicInfo
        v-if="currentPage === 'basicInfo'"
        :currentStep="currentStep"
        :itemForm="itemForm"
        :is-editing="!!editingItemId"
        @go-to-details="goToDetails"
        @go-to-my-items="goToMyItems"
      />

      <Details
        v-if="currentPage === 'details'"
        :currentStep="currentStep"
        :itemForm="itemForm"
        :is-editing="!!editingItemId"
        @go-to-basic-info="goToBasicInfo"
        @go-to-confirm="goToConfirm"
        @go-to-my-items="goToMyItems"
      />

      <ConfirmPage
        v-if="currentPage === 'confirm'"
        :currentStep="currentStep"
        :itemForm="itemForm"
        :is-editing="!!editingItemId"
        @go-to-details="goToDetails"
        @go-to-my-items="goToMyItems"
        @save-item="saveItem"
      />

      <MyItems
        v-if="currentPage === 'myItems'"
        :currentUserId="backendUser?.id"
        @view-item-details="viewItemDetails"
        @go-to-basic-info="goToBasicInfo(true)"
      />

      <ItemDetailsPage
        v-if="currentPage === 'itemDetails'"
        :item="selectedItem"
        :currentUserId="backendUser?.id"
        @edit-item="editItem"
        @delete-item="deleteItem"
        @go-to-my-items="goToMyItems"
        @go-to-send-request="goToSendRequest"
      />

      <SuccessDialog
        v-model="showSuccessDialog"
        :dialogType="dialogType"
        @go-to-my-items="goToMyItems"
        @confirm-delete="confirmDelete"
        @go-to-login="goToLogin"
      />

      <SendRequestPage
        v-if="currentPage === 'sendRequest'"
        :item="selectedItem"
        :itemForm="itemForm"
        :currentUserId="backendUser?.id"
        @go-to-discover="goToDiscover"
      />

      <RegisterPage
        v-if="currentPage === 'register'"
        :userForm="userForm"
        @save-user="saveUser"
        @go-to-login="goToLogin"
      />

      <LoginPage
        v-if="currentPage === 'login'"
        @go-to-register="goToRegister"
        @go-to-home="goToHome"
      />

      <Profile
        v-if="currentPage === 'profile'"
        :currentUser="currentUser"
        :user="backendUser"
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
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
}

.left-items {
  display: flex;
  align-items: center;
  gap: 12px;
}
.right-items {
  display: flex;
  align-items: center;
  gap: 8px;
}
.spacer {
  flex: 1;
}
</style>
