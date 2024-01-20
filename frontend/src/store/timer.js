import { useConfigStore } from "./config";
import { defineStore } from "pinia";

export const useTimerStore = defineStore("timer", {
  state: () => {
    return {
      time: 0,
      state: "work",
      paused: true,
      interval: null,
      prev: null,
    };
  },
  getters: {
    currentLimitMinutes(state) {
      const configStore = useConfigStore();
      const minutes =
        state.state === "work"
          ? configStore.get("work")
          : configStore.get("break");
      return minutes;
    },
    currentLimitSeconds() {
      return this.currentLimitMinutes * 60;
    },
  },
  actions: {
    begin() {
      this.interval = setInterval(() => {
        if (this.paused) {
          this.prev = Date.now();
          return;
        }
        this.time += (Date.now() - this.prev) / 1000;
        this.prev = Date.now();
        if (this.time >= this.currentLimitSeconds) {
          this.state = this.state === "work" ? "break" : "work";
          this.time = 0;
        }
      }, 100);
    },
    stop() {
      clearInterval(this.interval);
    },
    reset() {
      this.time = 0;
    },
    toggleState() {
      this.state = this.state === "work" ? "break" : "work";
      this.time = 0;
    },
    togglePaused() {
      this.paused = !this.paused;
    },
  },
});
