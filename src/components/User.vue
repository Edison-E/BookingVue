<script>
import axios from "axios";

export default {
  name: "HomeUser",
  data() {
    return {
      bookings: [],
      Cines: [],
      Restaurant: [],
      Motel: [],
      message: "",
      isClickCreate: false,
      isCheckBooking: false,
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
      this.isCheckBooking = true;
      axios
        .get("https://localhost:7093/api/Appointment/Check/", {
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
    ViewServices() {
      this.isClickCreate = true;
      this.GetCine();
      this.GetMotel();
      this.GetRestaurant();
    },
    GetCine() {
      axios
        .get("https://localhost:7093/api/Cine/GetCines")
        .then((response) => {
          this.Cines = response.data;
        })
        .catch((error) => {
          alert("Algo anda mal...");
          console.log(error);
        });
    },
    GetMotel() {
      axios
        .get("https://localhost:7093/api/Motel/GetMotels")
        .then((response) => {
          this.Motel = response.data;
        })
        .catch((error) => {
          alert("Algo anda mal...");
          console.log(error);
        });
    },
    GetRestaurant() {
      axios
        .get("https://localhost:7093/api/Restaurant/GetRestaurants")
        .then((response) => {
          this.Restaurant = response.data;
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
  <nav class="navegation">
    <button @click="CheckBookings">Check booking</button>
    <button @click="ViewServices">Create booking</button>
    <button @click="logout">Cerrar sesión</button>
  </nav>

  <div class="profile">
    <br />
    <h1>Bienvenido {{ Username }}</h1>
    <br />
    <p>Datos personales: {{ Email }}</p>
  </div>

  <div class="content">
    <div class="booking" v-show="isCheckBooking">
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
  </div>

  <br />

  <div class="services" v-show="isClickCreate">
    <h1>Nuestros servicios</h1>
    <p>Selecciono el nombre de algun servicio:</p>
    <div class="viewService">
      <table border="1">
        <legend>Cines</legend>
        <tr>
          <td>Name</td>
          <td>Address</td>
        </tr>
        <tr v-for="(Cines, index) in Cines" :key="index">
          <td id="nameService">{{ Cines.name }}</td>
          <td>{{ Cines.address }}</td>
        </tr>
      </table>
      <br />
      <table border="1">
        <legend>Motels</legend>
        <tr>
          <td>Name</td>
          <td>Address</td>
        </tr>
        <tr v-for="(Motel, index) in Motel" :key="index">
          <td id="nameService">{{ Motel.name }}</td>
          <td>{{ Motel.address }}</td>
        </tr>
      </table>
      <br />
      <table border="1">
        <legend>Restaurants</legend>
        <tr>
          <td>Name</td>
          <td>Address</td>
        </tr>
        <tr v-for="(Restaurant, index) in Restaurant" :key="index">
          <td id="nameService">{{ Restaurant.name }}</td>
          <td>{{ Restaurant.address }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
.content {
  display: grid;
  place-items: center;
  margin: auto;
  font-family: monospace;
}

.content p {
  color: green;
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

.services {
  margin: auto;
  font-family: monospace;
  text-align: center;
}

.viewService {
  display: flex;
  margin-left: 15%;
}

#nameService:hover{
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
}

.profile {
  display: grid;
  place-items: center;
  margin: auto;
  font-family: monospace;
}
</style>
