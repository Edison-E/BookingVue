<script>
import axios from "axios";

export default {
  name: "HomeUser",
  data() {
    return {
      bookings: [],
      message: "",
    };
  },
  computed: {
    Username() {
      return this.$store.state.username;
    },
    Email() {
      return this.$store.state.email;
    },
  },
  methods: {
    logout() {
      this.$store.commit("setAuthentication", false);
      this.$router.push("/");
    },
    CheckBookings() {
      var email = localStorage.getItem("email");
      axios
        .get("https://localhost:7093/api/Appointment/CheckCheck/", {
          params: { email: email },
        })
        .then((response) => {
          this.message = response.data.message[0];
          this.bookings = response.data.bookings;
        })
        .catch((error) => {
          alert("Algo anda mal...");
          console.log(error);
        });
    },
  },
};
</script>

<template>
  <div class="content">
    <nav class="navegation">
      <button @click="CheckBookings">Check Booking</button>
      <button @click="logout">Cerrar sesión</button>
    </nav>
    <br />
    <h1>Bienvenido {{ Username }}</h1>
    <br />
    <p>Datos personales: {{ Email }}</p>

    <p>{{ message }}</p>
    <table border="1">
      <tr>
        <td>Name</td>
        <td>Service</td>
        <td>Date</td>
      </tr>

      <tr v-for="(booking, index) in bookings" :key="index">
        <td>{{ booking.name }}</td>
        <td>{{ booking.service }}</td>
        <td>{{ booking.date }}</td>
      </tr>
    </table>
  </div>
</template>

<style>
.content {
  display: grid;
  place-items: center;
  margin: auto;
  font-family: monospace;
}

.navegation {
  background-color: rgb(72, 72, 172);
  padding: 1%;
  width: 90%;
}

.navegation button {
  border: none;
  background: none;
  color: white;
  font-size: 15px;
  margin-left: 10px;
  transition: all 0.3s ease-in-out;
}

.navegation button:hover {
  transform: scale(1.1);
  border-bottom: 1px solid rgb(255, 255, 255);
  background-color: rgb(0, 0, 0, 0.5);
}
</style>
