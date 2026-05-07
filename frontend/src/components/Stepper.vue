<script>
export default {
  name: "Stepper",
  props: {
    currentStep: {
      type: Number,
      default: 1,
    },
    steps: {
      type: Array,
      default: () => ["Info", "Detaljer", "Gennemse"],
    },
  },
};
</script>

<template>
  <div class="stepper-wrapper">
    <div v-for="(step, index) in steps" :key="index" class="step">
      <div
        class="step-circle"
        :class="{
          done: index + 1 < currentStep,
          active: index + 1 === currentStep,
        }"
      >
        <v-icon v-if="index + 1 < currentStep" size="16"> mdi-check </v-icon>
        <span v-else>{{ index + 1 }}</span>
      </div>

      <div class="step-label" :class="{ active: index + 1 === currentStep }">
        {{ step }}
      </div>

      <div
        v-if="index < steps.length - 1"
        class="step-line"
        :class="{ done: index + 1 < currentStep }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.stepper-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin: 24px 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #212121;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  z-index: 2;
  transition: 0.2s;
}

.step-circle:hover {
  transform: scale(1.1);
}

.step-circle.active,
.step-circle.done {
  background-color: #66bb6a;
  color: white;
}

.step-label {
  margin-top: 6px;
  font-size: 12px;
  color: #757575;
  text-align: center;
}

.step-label.active {
  color: white;
  font-weight: normal;
}

.step-line {
  position: absolute;
  top: 16px;
  left: 50%;
  width: 100%;
  height: 1px;
  background-color: #757575;
  z-index: 1;
  transition: background-color 0.3s;
}

.step-line.done {
  background-color: #66bb6a;
}
</style>
