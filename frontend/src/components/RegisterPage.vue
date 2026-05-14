<script>
import { authService } from "@/services/authService";
export default {
  name: "",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {},
  methods: {
    async register() {
      try {
        const user = await authService.register(this.email, this.password);

        console.log("User registered:", user);
      } catch (error) {
        console.error("Registration error:", error);
      }
    },
  },
  watch: {},
};
</script>

<template>
  <v-container class="page-container pa-6">
    <div class="hero">
      <h1 class="title">
        <span>Borrow</span>
      </h1>

      <p class="slogan">
        Opret en bruger hos Borrow og bliv en del af fællesskabet!
      </p>

      <v-card class="pa-6 login-card" width="100%" max-width="400">
        <!-- First Name -->
        <div class="input-group">
          <p class="input-label">Fornavn</p>

          <v-text-field
            placeholder="Dit fornavn"
            type="text"
            variant="solo"
            class="input"
            hide-details
            v-model="firstName"
          ></v-text-field>
        </div>

        <!-- Last Name -->
        <div class="input-group">
          <p class="input-label">Efternavn</p>

          <v-text-field
            placeholder="Dit efternavn"
            type="text"
            variant="solo"
            class="input"
            hide-details
            v-model="lastName"
          ></v-text-field>
        </div>

        <!-- Address -->
        <div class="input-group">
          <p class="input-label">Adresse</p>

          <v-text-field
            placeholder="Din adresse"
            type="text"
            variant="solo"
            class="input"
            hide-details
            v-model="address"
          ></v-text-field>
        </div>

        <!-- Phone Number -->
        <div class="input-group">
          <p class="input-label">Telefonnr.</p>

          <v-text-field
            placeholder="Dit telefonnummer"
            type="text"
            variant="solo"
            class="input"
            hide-details
            v-model="phoneNumber"
          ></v-text-field>
        </div>

        <!-- Email -->
        <div class="input-group">
          <p class="input-label">Email</p>

          <v-text-field
            placeholder="Din email"
            type="email"
            variant="solo"
            class="input"
            hide-details
            v-model="email"
          ></v-text-field>
        </div>

        <!-- Password -->
        <div class="input-group">
          <p class="input-label">Adgangskode</p>

          <v-text-field
            placeholder="Indtast en adgangskode"
            type="password"
            variant="solo"
            class="input"
            hide-details
            v-model="password"
          ></v-text-field>
        </div>

        <!-- Confirm Password -->
        <div class="input-group">
          <p class="input-label">Bekræft adgangskode</p>

          <v-text-field
            placeholder="Bekræft din adgangskode"
            type="password"
            variant="solo"
            class="input"
            hide-details
            v-model="confirmPassword"
          ></v-text-field>
        </div>
        <div class="login-btn">
          <v-btn
            color="green-lighten-1"
            class="btn"
            style="color: black; font-weight: normal"
            @click="register"
            >Opret konto</v-btn
          >
        </div>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 2px;
  transform: translateX(6px);
}

.logo {
  margin-right: -12px;
}

.slogan {
  margin-bottom: 40px;
  font-size: 16px;
  opacity: 0.8;
}

.login-card {
  background-color: #141414;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);

  width: 100%;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  gap: 16px;
}
.login-btn {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

:deep(.v-field) {
  border-radius: 999px !important;
}

.input,
.btn {
  width: 100%;
}

.input :deep(.v-field) {
  height: 56px;
}

.input-group {
  width: 100%;
  text-align: left;
}

.input-label {
  margin-bottom: 8px;
  margin-left: 4px;

  font-size: 14px;
  font-weight: normal;
}

.btn {
  width: 100%;
  height: 56px;
  border-radius: 999px;
  margin-top: 8px;
}

.text {
  font-size: 14px;
}
</style>
