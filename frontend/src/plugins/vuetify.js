import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#212121", // black
        secondary: "#FAFAFA", // white1
        accent: "#3FF23F", // neon : green
        info: "#F5F5F5", // white2
      },
      dark: {
        primary: "#212121", // black
        secondary: "#FAFAFA", // white1
      },
    },
  },
});
