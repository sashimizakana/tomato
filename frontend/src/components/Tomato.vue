<script setup>
import { ref } from "vue";
import Config from "./Tomato/Config.vue";
import Clock from "./Tomato/Clock.vue";
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore();
const configOpen = ref(false);
function quit(){
  window.runtime.Quit();
}
function toggleConfig(){
  configOpen.value = !configOpen.value
}
function minimise(){
  window.runtime.WindowMinimise();
}
if(!configStore.get('alwaysOnTop',true)){
  window.runtime.WindowSetAlwaysOnTop(false);
}
</script>
<template>
  <div class="tomato">
    <Config v-if="configOpen"></Config>
    <Clock v-else></Clock>
    <div class="tools">
      <button @click="toggleConfig">
        <font-awesome-icon icon="fa-solid fa-gear" />
      </button>
      <button @click="minimise">
        <font-awesome-icon icon="fa-solid fa-window-minimize" />
      </button>
      <button @click="quit">
        <font-awesome-icon icon="fa-solid fa-xmark" />
      </button>
    </div>
  </div>
</template>
<style scoped>
.tomato {
  height: 100%;
  position: relative;
}
.tools {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}
button {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  opacity: 0.5;
}
button:hover {
  opacity: 1;
}
</style>
