<script setup>
import { useLocalStorage } from "@vueuse/core";
import { computed } from "vue";

const config = useLocalStorage("config", {
  work: 25,
  break: 5,
  alwaysOnTop: true,
  noSound: false,
});
const workTime = computed({
  get: () => config.value?.work,
  set: (value) => (config.value = { ...config.value, work: value }),
});
const breakTime = computed({
  get: () => config.value?.break,
  set: (value) => (config.value = { ...config.value, break: value }),
});
const alwaysOnTop = computed({
  get: () => config.value?.alwaysOnTop || true,
  set: (value) => {
    config.value = { ...config.value, alwaysOnTop: value };
    window.runtime.WindowSetAlwaysOnTop(value);
  },
});
const noSound = computed({
  get: () => config.value?.noSound || false,
  set: (value) => {
    config.value = { ...config.value, noSound: value };
  },
});
const notification = computed({
  get: () => config.value?.notification || false,
  set: (value) => {
    config.value = { ...config.value, notification: value };
  },
});
</script>
<template>
  <div class="config">
    <div class="row">
      <label for="work">Work</label>
      <div>
        <input
          v-model="workTime"
          class="number"
          id="work"
          type="number"
          min="1"
        />
        min.
      </div>
    </div>
    <div class="row">
      <label for="break">Break</label>
      <div>
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
    <div class="row">
      <label for="alwaysOnTop">Always on top</label>
      <div class="checkbox">
        <input
          class="check"
          v-model="alwaysOnTop"
          type="checkbox"
          id="alwaysOnTop"
        />
      </div>
    </div>
    <div class="row">
      <label for="noSound">No sound</label>
      <div class="checkbox">
        <input
          class="check"
          v-model="noSound"
          type="checkbox"
          id="noSound"
        />
      </div>
    </div>
    <div class="row">
      <label for="notification">Desktop notification</label>
      <div class="checkbox">
        <input
          class="check"
          v-model="notification"
          type="checkbox"
          id="notification"
        />
      </div>
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
.row {
  display: grid;
  grid-template-columns: 10rem 10rem;
}
input.number {
  width: 3rem;
}
input.check {
  accent-color: #77c;
}
</style>
