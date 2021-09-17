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
    meta: {
      title: "스캔모드",
    },
  },
  {
    path: "/search",
    component: Search,
    meta: {
      title: "탐색모드",
    },
  },
  {
    path: "/favorites",
    component: Favorites,
    children: [
      {
        path: "",
        component: FavoritesList,
        meta: {
          title: "즐겨찾기",
        },
      },
      {
        path: "add",
        component: FavoritesAdd,
        meta: {
          title: "즐겨찾기 추가",
        },
      },
    ],
  },
  {
    path: "/guide",
    component: Guide,
    meta: {
      title: "사용법",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title;
  });
});

export default router;
