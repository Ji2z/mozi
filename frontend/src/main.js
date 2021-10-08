import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "./store/store";

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
  created() {
    const html = document.documentElement;
    html.setAttribute("lang", "ko");
  },
}).$mount("#app");
