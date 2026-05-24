<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  },
  computed: {},
  methods: {
    submitLogin() {
      if (!this.validate()) {
        return;
      }

      this.$emit("login", {
        email: this.email,
        password: this.password,
      });
    },
    validate() {
      let valid = true;

      if (!this.email.trim()) {
        this.errors.email = "Indtast venligst din email.";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(this.email)) {
        this.errors.email = "Indtast venligst en gyldig email.";
        valid = false;
      } else {
        this.errors.email = "";
      }

      if (!this.password.trim()) {
        this.errors.password = "Indtast venligst din adgangskode.";
        valid = false;
      } else {
        this.errors.password = "";
      }

      return valid;
    },
  },
  emits: ["login", "go-to-register"],
};
</script>

<template>
  <v-container class="page-container pa-6">
    <div class="hero">
      <h1 class="title">
        <span>Borrow</span>
      </h1>
      <p class="slogan">Del mere. Køb mindre.</p>
      <v-card class="pa-6 login-card" width="100%" max-width="400">
        <div class="input-group">
          <p class="input-label">Email</p>
          <div v-if="errors.email" class="error-text">
            {{ errors.email }}
          </div>

          <v-text-field
            placeholder="dig@eksempel.dk"
            type="email"
            variant="solo"
            class="input"
            hide-details
            v-model="email"
            autocomplete="off"
          ></v-text-field>
        </div>

        <div class="input-group">
          <p class="input-label">Adgangskode</p>
          <div v-if="errors.password" class="error-text">
            {{ errors.password }}
          </div>

          <v-text-field
            placeholder="Indtast din adgangskode"
            type="password"
            variant="solo"
            class="input"
            hide-details
            v-model="password"
            autocomplete="new-password"
          ></v-text-field>
        </div>
        <div class="login-btn">
          <v-btn
            color="green-lighten-1"
            class="btn"
            style="color: black; font-weight: normal"
            @click="submitLogin"
            >Log ind</v-btn
          >
        </div>
        <p class="text">
          Har du ingen konto?
          <v-btn
            variant="text"
            class="register-btn"
            @click="$emit('go-to-register')"
          >
            Tilmed dig her
          </v-btn>
        </p>
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

.register-btn {
  font-size: 14px;
  font-weight: normal;
  color: #4caf50;
  text-transform: none;
  padding: 0;
  min-width: 0;
}
.error-text {
  color: rgb(202, 20, 20);
  font-size: 14px;
  margin-top: 6px;
  margin-bottom: 8px;
  padding-left: 4px;
}
</style>
