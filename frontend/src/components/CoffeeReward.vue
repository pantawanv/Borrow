<script>
import { Vue3Lottie } from "vue3-lottie";
import coffeeAnimation from "@/assets/animations/coffee.json";

export default {
  components: {
    Vue3Lottie,
  },

  data() {
    return {
      coffeeAnimation,
    };
  },
};
</script>

<template>
  <div class="coffee-wrapper">
    <Vue3Lottie :animationData="coffeeAnimation" :height="250" :width="250" />

    <p class="progress-text">8 / 10 udlån</p>
  </div>
</template>

<style scoped>
.coffee-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress-text {
  margin-top: 12px;
  color: #9e9e9e;
  font-size: 18px;
}
</style>
