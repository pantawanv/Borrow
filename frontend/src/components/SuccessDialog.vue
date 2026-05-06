<script>
import congratsIcon from "@/assets/images/party-popper.png";

export default {
  name: "",

  data() {
    return {
      congratsIcon,
    };
  },

  props: {
    modelValue: Boolean,
    dialogType: String,
  },

  emits: ["update:modelValue", "go-to-my-items", "confirm-delete"],

  computed: {
    dialogTitle() {
      if (this.dialogType === "update") return "Genstand Opdateret!";
      if (this.dialogType === "delete") return "Slet Genstand?";
      if (this.dialogType === "exit") return "Annuller oprettelse?";
      if (this.dialogType === "exit-edit") return "Annuller redigering?";
      if (this.dialogType === "exit-request") return "Annuller anmodning?";
      return "Genstand Oprettet!";
    },

    dialogText() {
      if (this.dialogType === "update") {
        return "Din genstand er blevet opdateret og ændringerne er gemt.";
      }

      if (this.dialogType === "delete") {
        return "Er du sikker på, at du vil slette denne genstand? Denne handling kan ikke fortrydes.";
      }

      if (this.dialogType === "exit") {
        return "Er du sikker på, at du vil annullere oprettelsen? Dine indtastede oplysninger går tabt.";
      }

      if (this.dialogType === "exit-edit") {
        return "Er du sikker på, at du vil annullere redigeringen? Dine ændringer går tabt.";
      }

      if (this.dialogType === "exit-request") {
        return "Er du sikker på, at du vil annullere anmodningen? Dine indtastede oplysninger går tabt.";
      }

      return "Tak fordi du deler din genstand med andre. Den er nu synlig for andre brugere, og du kan administrere den under 'Mine genstande'.";
    },

    isDelete() {
      return this.dialogType === "delete";
    },
    isExit() {
      return (
        this.dialogType === "exit" ||
        this.dialogType === "exit-edit" ||
        this.dialogType === "exit-request"
      );
    },
  },
};
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <v-card class="success-modal pa-6">
      <div class="text-center">
        <v-card-title class="text-h5">
          {{ dialogTitle }}
        </v-card-title>

        <v-img
          v-if="!isDelete && !isExit"
          :src="congratsIcon"
          contain
          max-width="50"
          class="my-4 mx-auto"
        />

        <v-card-text class="text-info">
          {{ dialogText }}
        </v-card-text>

        <!-- DELETE -->
        <v-card-actions v-if="isDelete" class="justify-center mt-4 ga-3">
          <v-btn
            color="grey-darken-2"
            variant="flat"
            @click="$emit('update:modelValue', false)"
          >
            Annuller
          </v-btn>

          <v-btn
            color="red-darken-1"
            variant="flat"
            @click="
              $emit('confirm-delete');
              $emit('update:modelValue', false);
            "
          >
            Slet
          </v-btn>
        </v-card-actions>

        <!--   EXIT -->
        <v-card-actions v-else-if="isExit" class="justify-center mt-4 ga-3">
          <v-btn
            color="grey-darken-2"
            variant="flat"
            @click="$emit('update:modelValue', false)"
          >
            Bliv
          </v-btn>

          <v-btn
            color="red-darken-1"
            variant="flat"
            @click="
              $emit('update:modelValue', false);
              $emit('go-to-my-items');
            "
          >
            Ja, anuller
          </v-btn>
        </v-card-actions>

        <!-- CREATE / UPDATE -->
        <v-card-actions v-else class="justify-center mt-4">
          <v-btn
            color="green-lighten-1"
            variant="flat"
            class="confirm-btn"
            @click="
              $emit('update:modelValue', false);
              $emit('go-to-my-items');
            "
          >
            Gå til mine genstande
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.success-modal {
  max-width: 380px;
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
  line-height: 1.5;
}
</style>
