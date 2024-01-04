<script setup>
import { ref, computed } from "vue";
import { set, useLocalStorage } from "@vueuse/core";
const config = useLocalStorage("config", { work: 1, break: 5 });
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
const pause = ref(false);
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
async function wait(ms){
  return new Promise(resolve => setTimeout(() => resolve(), ms));
}

const FREQUENCY = 900;
const DURATION = 100;
const PAUSE = 30;
const BREAK = 300;
const LONG_BREAK = 1200;
async function alert(){
  await beep(DURATION, FREQUENCY, 0.5);
  await wait(PAUSE);
  await beep(DURATION, FREQUENCY, 0.5);
  await wait(PAUSE);
  await beep(DURATION, FREQUENCY, 0.5);
  await wait(PAUSE);
  await beep(DURATION, FREQUENCY, 0.5);
  await wait(BREAK);
  await beep(DURATION, FREQUENCY, 0.5);
  await wait(PAUSE);
  await beep(DURATION, FREQUENCY, 0.5);
  await wait(PAUSE);
  await beep(DURATION, FREQUENCY, 0.5);
  await wait(PAUSE);
  await beep(DURATION, FREQUENCY, 0.5);
}

setInterval(async () => {
  if (pause.value) {
    start = Date.now();
    return;
  }
  time.value += (Date.now() - start) / 1000;
  start = Date.now();
  if (minutes.value * 60 <= time.value) {
    status.value = status.value === "work" ? "break" : "work";
    time.value = 0;
    await alert();
  }
}, 1000);
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
      <button class="pause" @click="togglePause()" :class="{ paused: pause }">
        <font-awesome-icon class="icon" icon="fa-solid fa-pause" />
      </button>
      <div class="time">
        {{ currentMinutes.toFixed(0) }}:{{
          ("0" + (Math.floor(time) % 60)).slice(-2)
        }}
        / {{ minutes }}:00
      </div>
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
.pause {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.5;
}
.pause:hover {
  opacity: 1;
}
.paused {
  color: #e55;
  opacity: 1;
}
</style>