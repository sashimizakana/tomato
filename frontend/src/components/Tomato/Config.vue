<script setup>
import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";
const config = useLocalStorage("config", { work: 25, break: 5 });
const workTime = computed({
  get: () => config.value?.work,
  set: (value) => (config.value = { ...config.value, work: value }),
});
const breakTime = computed({
  get: () => config.value?.break,
  set: (value) => (config.value = { ...config.value, break: value }),
});
</script>
<template>
  <div class="config">
    <div>
      <label for="work">Work</label>
      <input
        v-model="workTime"
        class="number"
        id="work"
        type="number"
        min="1"
      />
      min.
    </div>
    <div>
      <label for="break">Break</label>
      <input
        v-model="breakTime"
        class="number"
        id="break"
        type="number"
        min="1"
      />
      min.
    </div>
  </div>
</template>
<style scoped>
.config {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 0.5rem;
}
label {
  display: inline-block;
  width: 4rem;
}
input.number {
  width: 3rem;
}
</style>
