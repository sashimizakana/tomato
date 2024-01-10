import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useConfigStore = defineStore("config", {
  state: () => {
    return {
      config:null
    }
  },
  getters:{
    get(state){
      return (key,defaultValue) => state.config[key] ?? defaultValue;
    }
  },
  actions:{
    load(){
      const config = useLocalStorage("config",{
        work: 25,
        break: 5,
        alwaysOnTop: true,
        noSound: false,
        notification: false,
      });
      this.config = Object.fromEntries(Object.entries(config.value));
    },
    set(key,value){
      this.config = {...this.config,[key]:value};
      useLocalStorage("config",this.config);
    }
  }
});