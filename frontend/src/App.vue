<script setup>
import Tomato from "./components/Tomato.vue";
import { useConfigStore } from "@/store/config";
const configStore = useConfigStore();
configStore.load();
</script>

<template>
  <Tomato></Tomato>
</template>

<style scoped></style>
