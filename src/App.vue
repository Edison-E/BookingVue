<template>
  <form v-if="!isAuthenticated" class="formulario">
    <legend>LOGIN</legend>
    <input type="text" v-model="email" placeholder="email" /><br />
    <input type="password" v-model="password" placeholder="password" /><br />
    <input type="submit" value="Login" @click="AuthenticateUser($event)" /><br />
    <button @click="AuthenticateGoogle($event)">Google</button>
  </form>

  <Router-view v-else />
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticate;
    },
  },
  methods: {
    AuthenticateUser(event) {
      event.preventDefault();
      var json = JSON.stringify({ email: this.email, password: this.password });

      axios
        .post("https://localhost:7093/api/Account/Login", json, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          alert(response.data.message[0]);
          localStorage.setItem("token", response.data.token);
          this.RedirectUser();
        })
        .catch((error) => {
          alert("Credenciales invalidas");
          console.log(error);
        });
    },
    RedirectUser() {
      var token = localStorage.getItem("token");

      axios
        .get("https://localhost:7093/api/User/GetProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.$store.commit("setAuthentication", true);
          this.$store.commit("setUsername", response.data.userDTO.name);
          this.$store.commit("setEmail", response.data.userDTO.email);
          this.$router.push('/User');
        })
        .catch((error) => {
          alert("Algo anda mal...");
          console.log(error);
        });
    },
    AuthenticateGoogle(event) {
      event.preventDefault();
      window.location.href = "https://localhost:7093/api/Account/GoogleLogin";
    },
  },
};
</script>

<style>
.formulario {
  display: grid;
  place-items: center;
  font-family: monospace;
  background-color: rgb(158, 232, 232);
  width: 200px;
  margin: auto;
  margin-top: 100px;
  padding: 10px;
}
</style>
