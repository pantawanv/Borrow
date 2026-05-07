<script>
export default {
  name: "BorrowerActions",

  props: {
    item: Object,
  },

  emits: ["go-to-send-request"],
};
</script>

<template>
  <div class="btn-actions">
    <v-btn
      color="green-lighten-1"
      style="color: black; font-weight: normal"
      @click="$emit('go-to-send-request', item)"
    >
      Anmod om at låne
    </v-btn>
  </div>
</template>
