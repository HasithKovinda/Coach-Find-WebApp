import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
    };
  },
  actions,
  mutations,
  getters,
};
