<script>
import ItemPreviewCard from "./ItemPreviewCard.vue";
import { itemService } from "@/services/itemService.js";
export default {
  name: "",
  components: {
    ItemPreviewCard,
  },
  data() {
    return {
      items: [],
      loading: false,
      selectedFilter: "Alle",
      filters: [
        "Alle",
        "Værktøj",
        "Køkken",
        "Elektronik",
        "Udendørs",
        "Sport",
        "Transport",
        "Underholdning",
        "Andet",
      ],
    };
  },
  async mounted() {
    await this.loadItems();
  },

  computed: {
    filteredItems() {
      if (this.selectedFilter === "Alle") {
        return this.items;
      }

      return this.items.filter((item) => item.category === this.selectedFilter);
    },
    filterCounts() {
      return {
        Alle: this.items.length,
        Værktøj: this.items.filter((item) => item.category === "Værktøj")
          .length,
        Køkken: this.items.filter((item) => item.category === "Køkken").length,
        Elektronik: this.items.filter((item) => item.category === "Elektronik")
          .length,
        Udendørs: this.items.filter((item) => item.category === "Udendørs")
          .length,
        Sport: this.items.filter((item) => item.category === "Sport").length,
        Transport: this.items.filter((item) => item.category === "Transport")
          .length,
        Underholdning: this.items.filter(
          (item) => item.category === "Underholdning",
        ).length,
        Andet: this.items.filter((item) => item.category === "Andet").length,
      };
    },
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
  watch: {},
  emits: ["view-item-details"],
};
</script>

<template>
  <h1 class="title-text">Find Genstande</h1>
  <p class="location-text">
    <v-icon size="18" class="mr-1">mdi-map-marker-radius-outline</v-icon>
    Roskilde (4000)
  </p>
  <v-text-field
    class="ma-4"
    label="Søg efter genstande"
    prepend-inner-icon="mdi-magnify"
    rounded="lg"
    variant="solo"
    hide-details
  />
  <v-row>
    <v-col cols="12">
      <div class="filter-btn-group">
        <div class="filter-scroll">
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
      </div>
    </v-col>
  </v-row>
  <v-row class="pa-6">
    <v-col v-for="item in filteredItems" :key="item.id" cols="12" md="6" lg="4">
      <ItemPreviewCard :item="item" @open="$emit('view-item-details', item)" />
    </v-col>
  </v-row>
</template>

<style scoped>
.title-text {
  font-size: 24px;
  font-weight: bold;
  padding: 12px 0 0 16px;
}

.location-text {
  font-size: 16px;
  padding: 0 16px;
  margin: 0;
  display: flex;
  align-items: center;
}

.filter-btn-group {
  display: flex;
  gap: 8px;
  padding: 0 16px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.filter-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 16px 8px 0;
}

.filter-scroll::-webkit-scrollbar {
  display: none;
}
</style>
