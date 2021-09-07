import Vue from "vue";
import VueRouter from "vue-router";
import Scan from "../views/Scan.vue";
import Search from "../views/Search.vue";
import Favorites from "../views/Favorites.vue";
import Guide from "../views/Guide.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/scan",
  },
  {
    path: "/scan",
    component: Scan,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/favorites",
    component: Favorites,
  },
  {
    path: "/guide",
    component: Guide,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
