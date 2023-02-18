export default {
  setUser(state, payload) {
    state.userId = payload.userId;
    state.token = payload.token;
    state.AutoLogout = false;
  },
  setAutoLogout(state) {
    state.AutoLogout = true;
  },
};
