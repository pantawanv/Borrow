<script>
import placeholder from "@/assets/images/placeholder.jpg";

export default {
  props: {
    item: Object,
  },

  data() {
    return {
      imagePlaceholder: placeholder,

      categories: {
        1: "Værktøj",
        2: "Køkken",
        3: "Elektronik",
        4: "Udendørs",
        5: "Sport",
        6: "Transport",
        7: "Underholdning",
        8: "Andet",
      },
    };
  },
  computed: {
    categoryName() {
      return this.categories[this.item.categoryId] || "Ukendt";
    },
    mainImage() {
      return this.item.images?.length
        ? this.item.images[0].imageUrl
        : this.imagePlaceholder;
    },
  },
};
</script>

<template>
  <v-card @click="$emit('open')" class="rounded-lg">
    <v-img class="item-image" :src="mainImage" cover />
    <div class="info-content">
      <div class="top-text">
        <v-card-title class="pa-0"> {{ item.name }} </v-card-title>

        <v-chip size="small"> {{ item.status }} </v-chip>
      </div>

      <p class="brand-text">{{ item.brand }}</p>

      <div class="chip-group">
        <v-chip size="small"> {{ item.itemCondition }}</v-chip>
        <v-chip size="small">{{ categoryName }}</v-chip>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.top-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px 0;
  margin: 0;
}

.brand-text {
  margin: 4px 16px 8px;
  font-size: 14px;
  opacity: 0.8;
}

.chip-group {
  display: flex;
  gap: 8px;
  padding: 0 16px 12px;
}

.info-content {
  padding: 8px 4px 8px 4px;
}

.item-image {
  height: 300px;
}
</style>
