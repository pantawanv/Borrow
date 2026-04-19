<script>
import congratsIcon from "@/assets/images/party-popper.png";
export default {
  name: "",
  components: {},
  data() {
    return {
      congratsIcon,
    };
  },
  props: {
    modelValue: Boolean,
  },
  computed: {},
  methods: {},
  watch: {},
  emits: ["update:modelValue", "go-to-my-items"],
};
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <v-card class="success-modal pa-6">
      <div class="text-center">
        <v-card-title class="text-h5">Genstand Oprettet!</v-card-title>
        <v-img
          :src="congratsIcon"
          alt="Congratulations Icon"
          contain
          max-width="50"
          class="my-4 mx-auto"
        />
        <v-card-text class="text-info">
          Tak fordi du deler din genstand med andre. Den er nu synlig for andre
          brugere, og du kan administrere den under "Mine genstande".
        </v-card-text>

        <v-card-actions class="justify-center mt-4">
          <v-btn
            color="green-lighten-1"
            variant="flat"
            density="comfortable"
            class="confirm-btn"
            @click="
              $emit('update:modelValue', false);
              $emit('go-to-my-items');
            "
            >Gå til mine genstande</v-btn
          >
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.success-modal {
  max-width: 360px;
  width: 100%;
  margin: auto;
}

.confirm-btn {
  color: black;
  font-weight: 500;
}

.text-info {
  font-size: 14px;
  color: white;
}
</style>
