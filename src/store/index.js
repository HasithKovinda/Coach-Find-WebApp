import { createStore } from "vuex";
import coachModule from "./coaches/index";
import requestModule from "./requests/index";
import authModule from "./auth/index";
const store = createStore({
  modules: {
    coaches: coachModule,
    requests: requestModule,
    auth: authModule,
  },
});

export default store;
