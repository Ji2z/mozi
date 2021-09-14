import Vue from "vue";
import VueRouter from "vue-router";
import Scan from "../views/Scan";
import Search from "../views/Search";
import Guide from "../views/Guide";
import Favorites from "../views/Favorites";
import FavoritesList from "../views/Favorites/FavoritesList";
import FavoritesAdd from "../views/Favorites/FavoritesAdd";

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
        component: FavoritesList,
      },
      {
        path: "add",
        component: FavoritesAdd,
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
