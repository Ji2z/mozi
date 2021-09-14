import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    product: {
      name: "",
      type: "",
      category: "",
      company: "",
      service_tel: "",
      allergy: "",
      caution: "",
      comparison: "",
    },
  },
  getters: {
    getProduct: (state) => {
      return state.product;
    },
  },
  mutations: {
    clear(state) {
      state.product = {};
    },
    getProductDetail(state, product) {
      state.product = {
        name: product.name,
        type: product.type,
        category: product.category,
        company: product.company,
        service_tel: product.serviceTel,
        allergy: product.allergy,
        caution: product.caution,
        comparison: product.comparison,
      };
    },
  },
  actions: {
    async getProductDetail({ commit }, product) {
      commit("clear");
      let url = "/api/beverage/search";
      const res = await axios.get(url, {
        params: {
          name: product.name,
          type: product.type,
        },
      });
      commit("getProductDetail", res.data);
    },
  },
});
