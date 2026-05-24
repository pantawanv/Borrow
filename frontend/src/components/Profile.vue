<script>
import userImage from "@/assets/images/user.png";
import { userService } from "../services/userService";
import CoffeeReward from "@/components/CoffeeReward.vue";
import RewardTicket from "@/components/RewardTicket.vue";
export default {
  name: "",
  props: {
    user: Object,
  },

  components: {
    CoffeeReward,
    RewardTicket,
  },
  data() {
    return {
      userImage,
      showRewardTicket: false,

      selectedReward: null,

      rewards: [
        {
          id: 1,
          title: "Gratis kop kaffe",
          date: "10.5.2026",
        },
        {
          id: 2,
          title: "Gratis kop kaffe",
          date: "17.5.2026",
        },
      ],
    };
  },
  methods: {
    openReward(reward) {
      this.selectedReward = reward;
      this.showRewardTicket = true;
    },

    markRewardAsUsed() {
      this.rewards = this.rewards.filter(
        (reward) => reward.id !== this.selectedReward.id,
      );

      this.showRewardTicket = false;
    },
  },
  emits: ["log-out"],
};
</script>

<template>
  <v-container class="page-container pa-6">
    <div class="top-items">
      <h1>Profil</h1>
      <v-btn variant="text" @click="$emit('log-out')">
        <v-icon class="mr-1">mdi-logout</v-icon>
        <span>Log ud</span>
      </v-btn>
    </div>
    <v-card class="profile-card">
      <div class="profile-content">
        <v-avatar size="68" class="profile-avatar">
          <v-img :src="userImage" />
        </v-avatar>

        <div class="profile-info">
          <h2>{{ user.firstName }} {{ user.lastName }}</h2>

          <p>
            <v-icon size="18" class="mr-1">mdi-email-outline</v-icon>
            {{ user.email }}
          </p>

          <p>
            <v-icon size="18" class="mr-1">mdi-map-marker-outline</v-icon>
            {{ user.address }} {{ user.postalCode }} {{ user.city }}
          </p>

          <p>
            <v-icon size="18" class="mr-1">mdi-phone-outline</v-icon>
            +45 {{ user.phoneNumber }}
          </p>
        </div>

        <v-btn icon variant="text" class="edit-btn">
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
    <h3>Din aktivitet</h3>
    <v-row class="impact-stats">
      <v-col cols="12" md="4">
        <v-card class="impact-card">
          <v-icon size="30" class="mr-1" color="green-lighten-1"
            >mdi-plus-box-multiple-outline</v-icon
          >
          <p class="stat-title">Genstande oprettet</p>
          <p class="stat-value">6</p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="impact-card">
          <v-icon size="30" class="mr-1" color="green-lighten-1"
            >mdi-arrow-top-right</v-icon
          >
          <p class="stat-title">Gange udlånt</p>
          <p class="stat-value">18</p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="impact-card">
          <v-icon size="30" class="mr-1" color="green-lighten-1"
            >mdi-emoticon-happy-outline</v-icon
          >
          <p class="stat-title">Gange lånt</p>
          <p class="stat-value">4</p>
        </v-card>
      </v-col>
    </v-row>
    <v-card class="coffee-reward mt-6">
      <v-card-text>
        <h3>
          <v-icon size="30" class="mr-1">mdi-coffee-outline</v-icon>
          Kaffebelønning
        </h3>
        <p class="stat-title">
          Udlån genstande 2 gange mere for at optjene en gratis kaffe på dit
          lokale kaffested!
        </p>
      </v-card-text>
      <div class="coffee-animation">
        <CoffeeReward />
      </div>
    </v-card>

    <v-card class="coffee-reward mt-6">
      <v-card-text>
        <h3>
          <v-icon size="30" class="mr-1">mdi-party-popper</v-icon>
          Dine belønninger
        </h3>
        <div v-if="rewards.length > 0" class="reward-list">
          <v-card
            v-for="reward in rewards"
            :key="reward.id"
            class="reward-item"
          >
            <div class="reward-left">
              <div class="reward-text">
                <div class="reward-header">
                  <v-icon size="22" color="green-lighten-1">
                    mdi-coffee-outline
                  </v-icon>

                  <h4 class="reward-title">
                    {{ reward.title }}
                  </h4>
                </div>

                <p class="reward-date">Optjent {{ reward.date }}</p>
              </div>
            </div>

            <v-btn
              @click="openReward(reward)"
              class="redeem-btn"
              color="green-lighten-1"
            >
              <v-icon class="mr-1">mdi-qrcode</v-icon>
              Indløs
            </v-btn>
          </v-card>
        </div>

        <div v-else class="empty-rewards">
          <p>
            Du har ingen belønninger lige nu.
            <br />
            Begynd at låne dine genstande ud for at optjene nye belønninger.
          </p>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="wish-list pt-6">
      <v-card-text>
        <h3>
          <v-icon size="30" class="mr-1">mdi-heart-outline</v-icon>
          Din ønskeliste
        </h3>
        <p class="stat-title">
          Tilføj genstande til din ønskeliste. Du får besked når de bliver
          tilgængelige igen.
        </p>
      </v-card-text>
    </v-card>
    <v-dialog v-model="showRewardTicket" max-width="500">
      <v-card class="reward-dialog">
        <RewardTicket />
        <div class="bottom-bar">
          <v-btn
            block
            color="green-lighten-1"
            class="dialog-btn used-btn"
            @click="markRewardAsUsed"
          >
            Markér som brugt
          </v-btn>

          <v-btn
            block
            color="grey-darken-4"
            class="dialog-btn"
            @click="showRewardTicket = false"
          >
            Luk
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 960px) {
  .page-container {
    max-width: 800px;
  }
}
.top-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-card,
.coffee-reward,
.wish-list {
  padding: 16px;
  border-radius: 16px;
  background-color: #141414;
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  margin-bottom: 22px;
}

.profile-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-avatar {
  flex-shrink: 0;
}

.profile-info {
  flex: 1;
}

.profile-info h2 {
  margin-bottom: 8px;
  font-size: 22px;
  font-weight: bold;
}

.profile-info p {
  display: flex;
  align-items: center;
  color: #9e9e9e;
  margin-bottom: 6px;
  font-size: 15px;
}

.edit-btn {
  align-self: flex-start;
}

.impact-card {
  padding: 16px;
  border-radius: 16px;
  background-color: #141414;
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  text-align: center;
  min-height: 140px;
}

.stat-title {
  color: #9e9e9e;
  font-size: 13px;
  margin: 0;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.reward-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 20px;
}

.reward-item {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 12px 16px;
  border-radius: 16px;

  background: linear-gradient(
    90deg,
    rgba(35, 35, 35, 1) 0%,
    rgba(25, 25, 25, 1) 100%
  );

  border: 1px solid rgba(255, 255, 255, 0.04);
}

.reward-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.reward-icon {
  font-size: 22px;
}

.redeem-btn {
  color: black;
  font-weight: 500;
  border-radius: 14px;
  padding-left: 16px;
  padding-right: 16px;
}

.reward-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
}

.reward-title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
}

.reward-date {
  color: #9e9e9e;
  margin-top: 4px;
  margin-left: 30px;
  font-size: 13px;
}

.coffee-animation {
  display: flex;
  justify-content: center;
}

h3 {
  margin-top: 0;
}

.reward-dialog {
  border-radius: 20px;
  background-color: #141414;
  padding: 20px;
}

.bottom-bar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 320px;
  margin: 28px auto 0 auto;
}

.dialog-btn {
  width: 100%;
  border-radius: 14px;
  font-weight: normal;
}

.used-btn {
  color: black;
}

.empty-rewards {
  color: #9e9e9e;
}
</style>
