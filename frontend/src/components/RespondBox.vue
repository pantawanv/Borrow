<script>
export default {
  name: "RespondBox",
  props: {
    modelValue: Boolean,
  },
  data() {
    return {
      suggestionText: "",
    };
  },
  methods: {
    sendSuggestion() {
      this.$emit("send-suggestion", this.suggestionText);

      this.suggestionText = "";

      this.$emit("update:modelValue", false);
    },
  },
  emits: ["update:modelValue", "send-suggestion"],
};
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <v-card class="respond-modal pa-6">
      <div class="text-center">
        <v-card-title class="text-h5">
          Foreslå andet
          <v-icon size="18" color="yellow-darken-1" class="pb-1"
            >mdi-lightbulb-outline</v-icon
          >
        </v-card-title>
        <p>
          Passer tidspunktet ikke? Foreslå et andet afhentningstidspunkt eller
          sted.
        </p>
        <v-textarea
          v-model="suggestionText"
          class="custom-textarea"
          rows="4"
          auto-grow
          variant="outlined"
          placeholder="F.eks. 'Jeg er ikke hjemme fredag, men lørdag formiddag passer perfekt' eller 'Jeg stiller den udenfor døren kl 17'"
        />
        <div class="text-center mt-4">
          <v-btn
            color="green-lighten-1"
            class="ma-1 btn-actions"
            style="color: black; font-weight: normal"
            @click="sendSuggestion"
          >
            Send forslag
          </v-btn>
          <v-btn
            color="grey-darken-4"
            class="ma-1 btn-actions"
            style="font-weight: normal"
            @click="$emit('update:modelValue', false)"
          >
            Anuller
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.respond-modal {
  max-width: 380px;
  width: 100%;
  margin: auto;
  border-radius: 10px;
}

.btn-actions {
  border-radius: 20px;
}

.custom-textarea :deep(textarea::placeholder) {
  font-size: 13px;
  font-style: italic;
}
</style>
