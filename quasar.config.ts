// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css";
import "@quasar/extras/material-icons-round/material-icons-round.css";
import "@quasar/extras/material-icons-sharp/material-icons-sharp.css";
import "@quasar/extras/material-symbols-outlined/material-symbols-outlined.css";
import "@quasar/extras/material-symbols-rounded/material-symbols-rounded.css";
import "@quasar/extras/material-symbols-sharp/material-symbols-sharp.css";
import "@quasar/extras/mdi-v6/mdi-v6.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import "@quasar/extras/bootstrap-icons/bootstrap-icons.css";

import lang from "quasar/lang/es";
import { Dialog, Loading, Notify } from "quasar";

export default {
  plugins: { Dialog, Notify, Loading },
  lang,
  extras: [
    "material-icons",
    "mdi-v6",
    "ionicons-v4", // last webfont was available in v4.6.3
    "eva-icons",
    "fontawesome-v5",
    "fontawesome-v6",
    "themify",
    "line-awesome",
    "bootstrap-icons",
  ],
};
