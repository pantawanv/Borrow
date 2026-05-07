<script>
export default {
  name: "OwnerActions",
  props: {
    item: Object,
    selectedStatus: String,
    isStatusChanged: Boolean,
    showToast: Boolean,
  },
  emits: [
    "update:selectedStatus",
    "update-status",
    "edit-item",
    "delete-item",
    "update:showToast",
  ],
};
</script>

<template>
  <div>
    <p id="item-admin-label">Administrer genstand</p>

    <div class="status-row">
      <v-select
        :model-value="selectedStatus"
        @update:model-value="$emit('update:selectedStatus', $event)"
        aria-labelledby="item-admin-label"
        rounded="lg"
        density="compact"
        variant="solo"
        class="select-status"
        :items="['Tilgængelig', 'Udlånt', 'Inaktiv']"
        hide-details
      />

      <v-btn
        color="green-darken-1"
        style="font-weight: normal"
        class="save-status-btn"
        :disabled="!isStatusChanged"
        @click="$emit('update-status')"
      >
        Gem
      </v-btn>

      <v-snackbar
        :model-value="showToast"
        @update:model-value="$emit('update:showToast', $event)"
        location="top"
        timeout="3000"
        color="green-darken-1"
      >
        Status opdateret!
      </v-snackbar>
    </div>

    <div class="btn-actions">
      <v-btn
        @click="$emit('edit-item', item)"
        color="#2a2a2a"
        class="edit-btn"
        style="font-weight: normal"
      >
        <v-icon>mdi-pencil-outline</v-icon>
        Rediger
      </v-btn>

      <v-btn
        @click="$emit('delete-item', item.id)"
        color="#2a2a2a"
        class="delete-btn"
        style="font-weight: normal"
      >
        <v-icon>mdi-delete-outline</v-icon>
        Slet
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.status-row,
.btn-actions {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 12px;
}

.select-status :deep(.v-field),
.save-status-btn,
.edit-btn,
.delete-btn {
  height: 36px;
  border-radius: 10px;
}

.select-status {
  max-width: 200px;
}

.save-status-btn {
  min-width: 100px;
}

.edit-btn,
.delete-btn {
  min-width: 120px;
}

.select-status :deep(input::placeholder) {
  color: white;
  opacity: 1;
}

.select-status :deep(.v-field) {
  background-color: #2a2a2a;
}
</style>
