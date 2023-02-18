import axios from "axios";

export default {
  async login(context, payload) {
    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3xL1wu8QIRDv8WUQk5vRIBbYg6EDJwgQ",
        {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }
      );
      console.log(res.data);
      context.commit("setUser", {
        userId: res.data.localId,
        token: res.data.idToken,
        tokenExpiration: res.data.tokenExpiration,
      });
    } catch (error) {
      console.log(error.response.data.error.message);
      const err = new Error("Email or Password Incorrect");
      throw err;
    }
  },
  async signup(context, payload) {
    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3xL1wu8QIRDv8WUQk5vRIBbYg6EDJwgQ",
        {
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }
      );
      console.log(res.data);
      context.commit("setUser", {
        userId: res.data.localId,
        token: res.data.idToken,
        tokenExpiration: res.data.tokenExpiration,
      });
    } catch (error) {
      console.log(error.response.data.error.message);
      const err = new Error(
        error.response.data.error.message || "Failed to authenticate"
      );
      throw err;
    }
  },

  logout(context) {
    context.commit("setUser", {
      userId: null,
      token: null,
      tokenExpiration: null,
    });
  },
};
