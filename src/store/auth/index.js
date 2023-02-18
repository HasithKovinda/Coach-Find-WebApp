import actions from "./actions.js";
import mutations from "./mutations.js";
import getters from "./getters";

export default {
  state() {
    return {
      userId: null,
      token: null,
      AutoLogout: false,
    };
  },
  actions,
  mutations,
  getters,
};
