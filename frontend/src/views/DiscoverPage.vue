<script>
import ItemPreviewCard from "@/components/ItemPreviewCard.vue";
import { itemService } from "@/services/itemService.js";
export default {
  name: "DiscoverPage",
  props: {
    currentUserId: Number,
  },
  components: {
    ItemPreviewCard,
  },
  data() {
    return {
      items: [],
      loading: false,
      searchQuery: "",
      selectedFilter: { label: "Alle", value: null },
      filters: [
        { label: "Alle", value: null },
        { label: "Værktøj", value: 1 },
        { label: "Køkken", value: 2 },
        { label: "Elektronik", value: 3 },
        { label: "Udendørs", value: 4 },
        { label: "Sport", value: 5 },
        { label: "Transport", value: 6 },
        { label: "Underholdning", value: 7 },
        { label: "Hobby", value: 8 },
        { label: "Andet", value: 9 },
      ],
    };
  },
  async mounted() {
    await this.loadItems();
  },

  computed: {
    filteredItems() {
      console.log("Current user:", this.currentUserId);
      console.log("Items:", this.items);

      let result = this.items.filter(
        (item) => item.ownerUserId !== this.currentUserId,
      );

      // Category filter
      if (this.selectedFilter.value !== null) {
        result = result.filter(
          (item) => item.categoryId === this.selectedFilter.value,
        );
      }

      // Search filter
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();

        result = result.filter(
          (item) =>
            item.name?.toLowerCase().includes(query) ||
            item.brand?.toLowerCase().includes(query),
        );
      }
      return result;
    },
    filterCounts() {
      const availableItems = this.items.filter(
        (item) => item.ownerUserId !== this.currentUserId,
      );
      return {
        Alle: availableItems.length,
        Værktøj: availableItems.filter((item) => item.categoryId === 1).length,
        Køkken: availableItems.filter((item) => item.categoryId === 2).length,
        Elektronik: availableItems.filter((item) => item.categoryId === 3)
          .length,
        Udendørs: availableItems.filter((item) => item.categoryId === 4).length,
        Sport: availableItems.filter((item) => item.categoryId === 5).length,
        Transport: availableItems.filter((item) => item.categoryId === 6)
          .length,
        Underholdning: availableItems.filter((item) => item.categoryId === 7)
          .length,
        Hobby: availableItems.filter((item) => item.categoryId === 8).length,
        Andet: availableItems.filter((item) => item.categoryId === 9).length,
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
    v-model="searchQuery"
    class="ma-4"
    label="Søg efter genstande"
    prepend-inner-icon="mdi-magnify"
    rounded="lg"
    variant="solo"
    hide-details
    append-inner-icon="mdi-close"
    @click:append-inner="searchQuery = ''"
  />
  <v-row>
    <v-col cols="12">
      <div class="filter-btn-group">
        <div class="filter-scroll">
          <v-btn
            v-for="filter in filters"
            :key="filter.value"
            rounded="xl"
            @click="selectedFilter = filter"
            :color="
              selectedFilter === filter ? 'green-lighten-1' : 'grey-darken-3'
            "
            :class="selectedFilter === filter ? 'text-black' : ''"
          >
            {{ filter.label }} ({{ filterCounts[filter.label] }})
          </v-btn>
        </div>
      </div>
    </v-col>
  </v-row>

  <div v-if="filteredItems.length === 0" class="empty-state">
    <v-icon size="48" class="mb-2">mdi-magnify-remove-outline</v-icon>
    <p>
      Ingen genstande matcher dine søgekriterier.
      <br />
      Prøv at ændre din søgning eller vælg en anden kategori.
    </p>
  </div>

  <div v-else class="items-grid">
    <ItemPreviewCard
      v-for="item in filteredItems"
      :key="item.id"
      :item="item"
      @open="$emit('view-item-details', item)"
    />
  </div>
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
.filter-btn-group .v-btn {
  font-weight: normal;
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

.items-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 24px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  color: #9e9e9e;
  text-align: center;
}
</style>
