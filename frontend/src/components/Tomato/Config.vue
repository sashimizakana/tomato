<script setup>
import { computed } from "vue";
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore()
const workTime = computed({
  get: () => configStore.get('work',25),
  set: (value) => configStore.set('work',value),
});
const breakTime = computed({
  get: () => configStore.get('break',5),
  set: (value) => configStore.set('break',value)
});
const alwaysOnTop = computed({
  get: () => configStore.get('alwaysOnTop',true),
  set: (value) => {
    configStore.set('alwaysOnTop',value)
    window.runtime.WindowSetAlwaysOnTop(value);
  },
});
const noSound = computed({
  get: () => configStore.get('noSound',false),
  set: (value) => configStore.set('noSound',value)
});
const notification = computed({
  get: () => configStore.get('notification',false),
  set: (value) => configStore.set('notification',value)
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
