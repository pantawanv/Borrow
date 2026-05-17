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
    <Vue3Lottie
      :animationData="coffeeAnimation"
      :height="250"
      :width="250"
      class="coffee-lottie"
    />

    <p class="progress-text">8 / 10 udlån</p>
  </div>
</template>

<style scoped>
.coffee-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 0;
  margin-top: -50px;
  margin-bottom: -10px;
}

.progress-text {
  color: #9e9e9e;
  font-size: 15px;

  margin-top: -35px;
}

.coffee-lottie {
  margin: 0;
  padding: 0;
}
</style>
