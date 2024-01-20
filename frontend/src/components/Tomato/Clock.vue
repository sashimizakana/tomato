<script setup>
import { ref, computed, onUnmounted, watch } from "vue";
import { Message } from "@wails/App";
import { useConfigStore } from "@/store/config";
import { useTimerStore } from "@/store/timer";
import { alert } from "@/lib/beep";
const configStore = useConfigStore();
const r = 150;
const d = r * 2;
const c = d * Math.PI;
const offset = (r * 2 * Math.PI) / 4;
function drawArc(ratio) {
  const line = c * ratio;
  return `${line}, ${c - line}`;
}
const timerStore = useTimerStore();
const time = computed(() => timerStore.time);
const state = computed(() => timerStore.state);
const paused = computed(() => timerStore.paused);
const currentMinutes = computed(() => {
  return time.value / 60;
});
const currentLimitMinutes = computed(() => {
  return timerStore.currentLimitMinutes;
});
const currentRatio = computed(() => {
  return currentMinutes.value / currentLimitMinutes.value;
});
function reset() {
  timerStore.reset();
}
watch(state, async (value) => {
  if (configStore.get('notification')) {
    Message(
      value === "work"
        ? "作業時間が開始しました"
        : "休憩時間が開始しました"
    );
  }
  if (!configStore.get('noSound')) {
    await alert();
  }
});
function togglePaused() {
  timerStore.togglePaused();
}
</script>
<template>
  <div class="clock">
    <svg :class="state" class="clock">
      <circle cx="200" cy="200" :r="r" class="base" />
      <circle class="active" cx="200" cy="200" :r="r" :stroke-dashoffset="offset"
        :stroke-dasharray="drawArc(currentRatio)" />
    </svg>
    <div class="tool" style="--wails-draggable:no-drag">
      <button class="status" @click="togglePaused()" :class="{ paused }">
        <font-awesome-icon v-if="paused" class="icon" icon="fa-solid fa-pause" />
        <font-awesome-icon v-else class="icon" icon="fa-solid fa-play" />
      </button>
      <div class="time">
        {{ Math.floor(currentMinutes) }}:{{
          ("0" + (Math.floor(time) % 60)).slice(-2)
        }}
        / {{ Math.floor(currentLimitMinutes) }}:00
      </div>
      <button @click="reset">
        <font-awesome-icon class="icon" icon="fa-solid fa-rotate-left" />
      </button>
    </div>
  </div>
</template>
<style scoped>
.clock {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.tool {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
}

svg.clock {
  height: 100%;
  width: 100%;
}

circle {
  fill: none;
  stroke-width: 20px;
}

.work circle {
  stroke: #e55;
}

.break circle {
  stroke: #77c;
}

circle.base {
  opacity: 0.1;
}

.icon {
  font-size: 13pt;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  color: white;
}

.status {
  color: #77c;
}

.status:hover {
  opacity: 1;
}

.status.paused {
  color: #e55;
  opacity: 1;
}
</style>
