<script setup>
import { ref, computed, onUnmounted } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { Message } from "@wails/App";
const config = useLocalStorage("config", {
  work: 25,
  break: 5,
  alwaysOnTop: true,
  noSound: false,
  notification: false,
});
const r = 150;
const d = r * 2;
const c = d * Math.PI;
const offset = (r * 2 * Math.PI) / 4;
function drawArc(ratio) {
  const line = c * ratio;
  return `${line}, ${c - line}`;
}
const status = ref("work");
const time = ref(0);
const currentMinutes = computed(() => {
  return time.value / 60;
});
const minutes = computed(() => {
  return status.value === "work" ? config.value.work : config.value.break;
});
const currentRatio = computed(() => {
  return currentMinutes.value / minutes.value;
});
const pause = ref(true);
let start = Date.now();

async function beep(duration, frequency, volume) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  gainNode.gain.value = volume;
  oscillator.frequency.value = frequency;
  oscillator.type = "sine";
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
  return new Promise((resolve) => {
    oscillator.onended = () => {
      resolve();
    };
  });
}
async function wait(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

const FREQUENCY = 300;
const DURATION = 200;
const PAUSE = 100;
const BREAK = 300;
const LONG_BREAK = 1200;
const VOLUME = 0.4;

function reset() {
  time.value = 0;
}

async function alert() {
  await beep(DURATION, FREQUENCY, VOLUME);
  await wait(PAUSE);
  await beep(DURATION, FREQUENCY, VOLUME);
  await wait(PAUSE);
}
const interval = setInterval(async () => {
  if (pause.value) {
    start = Date.now();
    return;
  }
  time.value += (Date.now() - start) / 1000;
  start = Date.now();
  if (minutes.value * 60 <= time.value) {
    status.value = status.value === "work" ? "break" : "work";
    time.value = 0;
    if (config.value.notification) {
      Message(
        status.value === "work"
          ? "作業時間が開始しました"
          : "休憩時間が開始しました"
      );
    }
    if (!config.value.noSound) {
      await alert();
    }
  }
}, 100);
onUnmounted(() => {
  clearInterval(interval);
});
function togglePause() {
  pause.value = !pause.value;
}
</script>
<template>
  <div class="clock">
    <svg :class="status" class="clock">
      <circle cx="200" cy="200" :r="r" class="base" />
      <circle
        class="active"
        cx="200"
        cy="200"
        :r="r"
        :stroke-dashoffset="offset"
        :stroke-dasharray="drawArc(currentRatio)"
      />
    </svg>
    <div class="tool">
      <button class="status" @click="togglePause()" :class="{ paused: pause }">
        <font-awesome-icon v-if="pause" class="icon" icon="fa-solid fa-pause" />
        <font-awesome-icon v-else class="icon" icon="fa-solid fa-play" />
      </button>
      <div class="time">
        {{ Math.floor(currentMinutes) }}:{{
          ("0" + (Math.floor(time) % 60)).slice(-2)
        }}
        / {{ minutes }}:00
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
