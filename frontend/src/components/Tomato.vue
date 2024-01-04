<script setup>
import { ref, computed } from "vue";
import { useLocalStorage } from "@vueuse/core";
import Config from "./Tomato/Config.vue";
import Clock from "./Tomato/Clock.vue";
const config = useLocalStorage("config", { work: 25, break: 5 });
const configOpen = ref(false);
</script>
<template>
  <div class="tomato">
    <Config v-if="configOpen"></Config>
    <Clock v-else></Clock>
    <button @click="configOpen = !configOpen">
      <font-awesome-icon icon="fa-solid fa-gear" />
    </button>
  </div>
</template>
<style scoped>
.tomato {
  height:100%;
  position: relative;
}
button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
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