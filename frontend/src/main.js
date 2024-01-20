import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

import "./style.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faGear,
  faPause,
  faXmark,
  faWindowMinimize,
  faPlay,
  faRotateLeft,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(faGear);
library.add(faPause);
library.add(faXmark);
library.add(faWindowMinimize);
library.add(faPlay);
library.add(faRotateLeft);
library.add(faRotateLeft);
library.add(faArrowRightArrowLeft);

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
