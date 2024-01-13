import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useConfigStore = defineStore("config", {
  state: () => {
    return {
      config: null,
    };
  },
  getters: {
    get(state) {
      return (key, defaultValue) => state.config[key] ?? defaultValue;
    },
    defaultConfig() {
      return {
        work: 25,
        break: 5,
        alwaysOnTop: true,
        noSound: false,
        notification: false,
      };
    },
  },
  actions: {
    load() {
      const config = useLocalStorage("config", this.defaultConfig);
      this.config = Object.fromEntries(Object.entries(config.value));
    },
    set(key, value) {
      this.config = { ...this.config, [key]: value };
      const config = useLocalStorage("config", this.defaultConfig);
      config.value = this.config;
    },
  },
});
