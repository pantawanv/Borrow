<script>
import ItemPreviewCard from "@/components/ItemPreviewCard.vue";
import { itemService } from "@/services/itemService.js";

export default {
  components: {
    ItemPreviewCard,
  },

  data() {
    return {
      items: [],
      loading: false,
    };
  },

  async mounted() {
    await this.loadItems();
  },

  methods: {
    async loadItems() {
      try {
        this.loading = true;
        this.items = await itemService.getAll();
      } catch (error) {
        console.error("Failed to load items:", error);
      } finally {
        this.loading = false;
      }
    },
  },

  emits: ["view-item-details", "go-to-basic-info"],
};
</script>

<template>
  <div class="top-items">
    <h1 class="title-text">Mine Genstande</h1>
    <v-btn
      color="green-lighten-1"
      class="text-black"
      @click="$emit('go-to-basic-info')"
    >
      + Tilføj Genstand
    </v-btn>
  </div>
  <v-row>
    <v-col cols="12">
      <div class="filter-btn-group">
        <v-btn>Alle</v-btn>
        <v-btn>Tilgængelig</v-btn>
        <v-btn>Udlånt</v-btn>
        <v-btn>Inaktive</v-btn>
      </div>
    </v-col>
  </v-row>
  <p class="info-text">
    Her kan du se og administrere de genstande, du har tilføjet.
  </p>
  <v-row class="pa-6">
    <v-col v-for="item in items" :key="item.id" cols="12" md="6" lg="4">
      <ItemPreviewCard :item="item" @open="$emit('view-item-details', item)" />
    </v-col>
  </v-row>
</template>

<style scoped>
.top-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-top: 16px;
  padding-right: 8px;
}
.title-text {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  padding: 0 16px;
}
.info-text {
  font-size: 16px;
  padding: 0 16px;
}

.filter-btn-group {
  display: flex;
  gap: 8px;
  padding: 0 16px;
  flex-wrap: wrap;
}

.text-black {
  color: black;
}

.item-container {
  padding: 22px;
}

.clickable-card {
  cursor: pointer;
}
</style>
