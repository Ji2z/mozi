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
    mute: null,
    isDetect: false,
  },
  getters: {
    getProduct: (state) => {
      return state.product;
    },
    getMute: (state) => {
      return state.mute;
    },
    getIsDetect: (state) => {
      return state.isDetect;
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
    STORE_MUTE(state, mute) {
      state.mute = mute;
    },
    STORE_IS_DETECT(state, isDetect) {
      state.isDetect = isDetect;
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
    storeMute({ commit }, mute) {
      commit("STORE_MUTE", mute);
    },
    storeIsDetect({ commit }, isDetect) {
      commit("STORE_IS_DETECT", isDetect);
    },
  },
});
