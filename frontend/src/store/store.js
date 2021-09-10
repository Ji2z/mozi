import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    product: {
      name: "",
      category: "",
      company: "",
      service_tel: "",
      allergy: "",
      caution: null,
      comparision: null,
    },
  },
  getters: {
    getProduct: (state) => {
      return state.product;
    },
  },
  mutations: {
    getProductDetail(state, product) {
      state.product = {
        name: product.name,
        category: "종류",
        company: "제조사",
        service_tel: "고객센터",
        allergy: "성분주의",
        caution: null,
        comparision: null,
      };
    },
  },
  actions: {
    getProductDetail({ commit }, product) {
      commit("getProductDetail", product);
    },
    // for axios
    // async getProductDetail({ commit }, product) {
    //   let url = "";
    //   const res = await axios.get(url, {
    //     params: {
    //       name: product.name,
    //       type: product.type,
    //     },
    //   });
    //   commit("getProductDetail", res);
    // },
  },
});
