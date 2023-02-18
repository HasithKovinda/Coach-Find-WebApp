import axios from "axios";
import { setTimeout } from "core-js";
let timer;

export default {
  async login(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "login" });
  },
  async signup(context, payload) {
    return context.dispatch("auth", { ...payload, mode: "signup" });
  },

  async auth(context, payload) {
    const apiKey = process.env.VUE_APP_FIREBASE_API_KEY;
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    if (mode === "signup") {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
    }
    try {
      const res = await axios.post(url, {
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      });

      const expiresIn = +res.data.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("userId", res.data.localId);
      localStorage.setItem("tokenExpires", expirationDate);

      timer = setTimeout(function () {
        context.dispatch(" autoLogout");
      }, expiresIn);

      context.commit("setUser", {
        userId: res.data.localId,
        token: res.data.idToken,
      });
    } catch (error) {
      let err;
      if (mode === "signup") {
        err = new Error("Email or Password Incorrect");
      } else {
        err = new Error(
          error.response.data.error.message || "Failed to authenticate"
        );
      }

      throw err;
    }
  },

  logout(context) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpires");

    clearTimeout(timer);

    context.commit("setUser", {
      userId: null,
      token: null,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpire = localStorage.getItem("tokenExpires");

    const expiresIn = +tokenExpire - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function () {
      context.dispatch(" autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        userId,
        token,
      });
    }
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
