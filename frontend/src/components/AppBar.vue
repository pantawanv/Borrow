<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    goToHome() {
      this.$emit("go-to-home");
    },
    goToMyItems() {
      this.$emit("go-to-my-items");
    },
    goToRequests() {
      this.$emit("go-to-requests");
    },
    goToProfile() {
      this.$emit("go-to-profile");
    },
  },
  emits: ["go-to-home", "go-to-my-items", "go-to-requests", "go-to-profile"],
};
</script>

<template>
  <v-app-bar class="app-bar">
    <!-- TODO: Flyt knapperne og fjern div -->
    <div class="top-items">
      <div class="left-items">
        <v-toolbar-title @click="goToHome"> Borrow </v-toolbar-title>

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
</template>

<style scoped>
.app-bar {
  background-color: rgb(26, 25, 25);
  color: white;
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
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

.v-toolbar-title {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.spacer {
  flex: 1;
}
</style>
