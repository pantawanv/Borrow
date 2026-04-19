<script>
import placeholder from "@/assets/images/placeholder.jpg";
export default {
  name: "",
  components: {},
  data() {
    return {
      imagePlaceholder: placeholder,
    };
  },
  computed: {},
  methods: {},
  watch: {},
};
</script>

<template>
  <v-card @click="$emit('open')" class="rounded-lg">
    <v-img class="item-image" :src="imagePlaceholder" cover />
    <div class="info-content">
      <div class="top-text">
        <v-card-title class="pa-0"> Navn på genstand her </v-card-title>

        <v-chip size="small">Status</v-chip>
      </div>

      <p class="brand-text">Mærke på genstand her</p>

      <div class="chip-group">
        <v-chip size="small">Stand</v-chip>
        <v-chip size="small">Kategori</v-chip>
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
