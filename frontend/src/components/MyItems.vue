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
      selectedFilter: "Alle",

      filters: ["Alle", "Tilgængelig", "Udlånt", "Inaktiv"],
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
  computed: {
    filteredItems() {
      if (this.selectedFilter === "Alle") {
        return this.items;
      }

      return this.items.filter((item) => item.status === this.selectedFilter);
    },

    filterCounts() {
      return {
        Alle: this.items.length,

        Tilgængelig: this.items.filter((item) => item.status === "Tilgængelig")
          .length,

        Udlånt: this.items.filter((item) => item.status === "Udlånt").length,

        Inaktiv: this.items.filter((item) => item.status === "Inaktiv").length,
      };
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
        <v-btn
          v-for="filter in filters"
          :key="filter"
          rounded="xl"
          @click="selectedFilter = filter"
          :color="
            selectedFilter === filter ? 'green-lighten-1' : 'grey-darken-3'
          "
          :class="selectedFilter === filter ? 'text-black' : ''"
        >
          {{ filter }} ({{ filterCounts[filter] }})
        </v-btn>
      </div>
    </v-col>
  </v-row>
  <p class="info-text">
    Her kan du se og administrere de genstande, du har tilføjet.
  </p>
  <p v-if="items.length === 0" class="info-text">
    Du har ingen genstande endnu.
  </p>

  <p v-else-if="filteredItems.length === 0" class="info-text">
    Ingen genstande matcher det valgte filter.
  </p>
  <v-row class="pa-6">
    <v-col v-for="item in filteredItems" :key="item.id" cols="12" md="6" lg="4">
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
