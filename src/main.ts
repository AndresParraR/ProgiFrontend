import "@/style.css";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "@/router";

import { Quasar } from "quasar";

// Import icon libraries
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import quasarConfig from "../quasar.config";

createApp(App)
  .use(createPinia())
  .use(router)
  .use(Quasar, quasarConfig)
  .mount("#app");
