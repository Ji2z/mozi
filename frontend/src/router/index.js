import Vue from "vue";
import VueRouter from "vue-router";
import Scan from "../views/Scan.vue";
import Search from "../views/Search.vue";
import Favorites from "../views/Favorites.vue";
import Guide from "../views/Guide.vue";
import FavoriteList from "../components/Favorite/List.vue";
import FavoriteAdd from "../components/Favorite/Add.vue";

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
    children: [
      {
        path: "",
        component: FavoriteList,
      },
      {
        path: "add",
        component: FavoriteAdd,
      },
    ],
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
