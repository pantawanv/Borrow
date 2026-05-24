<script>
import { authService } from "@/services/authService";
import SuccessDialog from "@/components/SuccessDialog.vue";
export default {
  name: "",
  components: {
    SuccessDialog,
  },
  data() {
    return {
      showDialog: false,
      dialogType: null,

      errors: {
        firstName: "",
        lastName: "",
        address: "",
        postalCode: "",
        city: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  computed: {},
  methods: {
    async register() {
      if (!this.validate()) {
        return;
      }
      await this.$emit("save-user");

      // Remove focus from input fields
      document.activeElement.blur();

      this.dialogType = "account-created";
      this.showDialog = true;
    },
    validate() {
      let valid = true;

      // First Name validation
      if (!this.userForm.firstName?.trim()) {
        this.errors.firstName = "Fornavn er påkrævet.";
        valid = false;
      } else {
        this.errors.firstName = "";
      }

      // Last Name validation
      if (!this.userForm.lastName?.trim()) {
        this.errors.lastName = "Efternavn er påkrævet.";
        valid = false;
      } else {
        this.errors.lastName = "";
      }

      // Address validation
      if (!this.userForm.address?.trim()) {
        this.errors.address = "Adresse er påkrævet.";
        valid = false;
      } else {
        this.errors.address = "";
      }

      // Postal Code validation
      if (!this.userForm.postalCode?.trim()) {
        this.errors.postalCode = "Postnummer er påkrævet.";
        valid = false;
      } else {
        this.errors.postalCode = "";
      }

      // City validation
      if (!this.userForm.city?.trim()) {
        this.errors.city = "By er påkrævet.";
        valid = false;
      } else {
        this.errors.city = "";
      }

      // Phone Number validation
      if (!this.userForm.phoneNumber?.trim()) {
        this.errors.phoneNumber = "Telefonnr. er påkrævet.";
        valid = false;
      } else {
        this.errors.phoneNumber = "";
      }

      // Email validation
      if (!this.userForm.email?.trim()) {
        this.errors.email = "Email er påkrævet.";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(this.userForm.email)) {
        this.errors.email = "Indtast en gyldig email.";
        valid = false;
      } else {
        this.errors.email = "";
      }

      // Password validation
      if (!this.userForm.password?.trim()) {
        this.errors.password = "Adgangskode er påkrævet.";
        valid = false;
      } else if (this.userForm.password.length < 6) {
        this.errors.password = "Adgangskoden skal være mindst 6 tegn.";
        valid = false;
      } else {
        this.errors.password = "";
      }

      // Confirm Password validation
      if (!this.userForm.confirmPassword?.trim()) {
        this.errors.confirmPassword = "Bekræft venligst adgangskoden.";
        valid = false;
      } else if (this.userForm.password !== this.userForm.confirmPassword) {
        this.errors.confirmPassword = "Adgangskoderne matcher ikke.";
        valid = false;
      } else {
        this.errors.confirmPassword = "";
      }

      return valid;
    },
  },
  watch: {},
  props: {
    userForm: Object,
  },
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
          <div v-if="errors.firstName" class="error-text">
            {{ errors.firstName }}
          </div>

          <v-text-field
            placeholder="Dit fornavn"
            type="text"
            variant="solo"
            class="input"
            hide-details
            v-model="userForm.firstName"
          ></v-text-field>
        </div>

        <!-- Last Name -->
        <div class="input-group">
          <p class="input-label">Efternavn</p>
          <div v-if="errors.lastName" class="error-text">
            {{ errors.lastName }}
          </div>

          <v-text-field
            placeholder="Dit efternavn"
            type="text"
            variant="solo"
            class="input"
            hide-details
            v-model="userForm.lastName"
          ></v-text-field>
        </div>

        <!-- Street name -->
        <div class="input-group">
          <p class="input-label">Gadenavn og nr.</p>
          <div v-if="errors.address" class="error-text">
            {{ errors.address }}
          </div>

          <v-text-field
            placeholder="Dit gadenavn og nr."
            type="text"
            variant="solo"
            class="input"
            hide-details
            v-model="userForm.address"
          ></v-text-field>
        </div>

        <div class="grouped">
          <!-- Postal Code -->
          <div class="input-group">
            <p class="input-label">Postnummer</p>
            <div v-if="errors.postalCode" class="error-text">
              {{ errors.postalCode }}
            </div>

            <v-text-field
              placeholder="Dit postnummer"
              type="text"
              variant="solo"
              class="input"
              hide-details
              v-model="userForm.postalCode"
            ></v-text-field>
          </div>

          <!-- City -->
          <div class="input-group">
            <p class="input-label">By</p>
            <div v-if="errors.city" class="error-text">
              {{ errors.city }}
            </div>

            <v-text-field
              placeholder="Din by"
              type="text"
              variant="solo"
              class="input"
              hide-details
              v-model="userForm.city"
            ></v-text-field>
          </div>
        </div>

        <!-- Phone Number -->
        <div class="input-group">
          <p class="input-label">Telefonnr.</p>
          <div v-if="errors.phoneNumber" class="error-text">
            {{ errors.phoneNumber }}
          </div>

          <v-text-field
            placeholder="Dit telefonnummer"
            type="text"
            variant="solo"
            class="input"
            hide-details
            v-model="userForm.phoneNumber"
          ></v-text-field>
        </div>

        <!-- Email -->
        <div class="input-group">
          <p class="input-label">Email</p>
          <div v-if="errors.email" class="error-text">
            {{ errors.email }}
          </div>

          <v-text-field
            placeholder="Din email"
            type="email"
            variant="solo"
            class="input"
            hide-details
            v-model="userForm.email"
            autocomplete="off"
          ></v-text-field>
        </div>

        <!-- Password -->
        <div class="input-group">
          <p class="input-label">Adgangskode</p>
          <div v-if="errors.password" class="error-text">
            {{ errors.password }}
          </div>

          <v-text-field
            placeholder="Indtast en adgangskode"
            type="password"
            variant="solo"
            class="input"
            hide-details
            v-model="userForm.password"
            autocomplete="new-password"
          ></v-text-field>
        </div>

        <!-- Confirm Password -->
        <div class="input-group">
          <p class="input-label">Bekræft adgangskode</p>
          <div v-if="errors.confirmPassword" class="error-text">
            {{ errors.confirmPassword }}
          </div>

          <v-text-field
            placeholder="Bekræft din adgangskode"
            type="password"
            variant="solo"
            class="input"
            hide-details
            v-model="userForm.confirmPassword"
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
      <SuccessDialog
        v-model="showDialog"
        :dialogType="dialogType"
        @go-to-login="$emit('go-to-login')"
      />
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

.grouped {
  display: flex;
  gap: 16px;
}

.error-text {
  color: rgb(202, 20, 20);
  font-size: 14px;
  margin-top: 6px;
  margin-bottom: 8px;
  padding-left: 4px;
}
</style>
