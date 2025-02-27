import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      isAuthenticate: !!localStorage.getItem("token"),
      username: localStorage.getItem("username") || "",
      email: localStorage.getItem("email") || "",
    };
  },
  mutations: {
    setAuthentication(state, status) {
      state.isAuthenticate = status;
      if (!status) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
      }
    },
    setUsername(state, name) {
      state.username = name;
      localStorage.setItem("username", name);
    },
    setEmail(state, email) {
      state.email = email;
      localStorage.setItem("email", email);
    },
  },
});

export default store;
