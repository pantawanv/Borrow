<script>
import Home from "@/components/Home.vue";
import BasicInfo from "@/components/BasicInfo.vue";
import Stepper from "./components/Stepper.vue";
import Details from "./components/Details.vue";
import ConfirmPage from "./components/ConfirmPage.vue";
import MyItems from "./components/MyItems.vue";
import ItemDetailsPage from "@/components/ItemDetailsPage.vue";
import DiscoverPage from "@/components/DiscoverPage.vue";
export default {
  name: "App",
  data() {
    return {
      currentPage: "home",
      currentStep: 1,
    };
  },
  components: {
    Home,
    DiscoverPage,
    BasicInfo,
    Stepper,
    Details,
    ConfirmPage,
    MyItems,
    ItemDetailsPage,
  },
  computed: {},
  methods: {
    goToHome() {
      this.currentPage = "home";
    },
    goToDiscover() {
      this.currentPage = "discover";
    },
    goToBasicInfo() {
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
    },
    viewItemDetails() {
      this.currentPage = "itemDetails";
    },
  },
  watch: {},
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
        @go-to-details="goToDetails"
        @go-to-my-items="goToMyItems"
      />

      <Details
        v-if="currentPage === 'details'"
        :currentStep="currentStep"
        @go-to-basic-info="goToBasicInfo"
        @go-to-confirm="goToConfirm"
        @go-to-my-items="goToMyItems"
      />

      <ConfirmPage
        v-if="currentPage === 'confirm'"
        :currentStep="currentStep"
        @go-to-details="goToDetails"
        @go-to-my-items="goToMyItems"
      />

      <MyItems
        v-if="currentPage === 'myItems'"
        @view-item-details="viewItemDetails"
        @go-to-basic-info="goToBasicInfo"
      />

      <ItemDetailsPage
        v-if="currentPage === 'itemDetails'"
        @go-to-my-items="goToMyItems"
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
