<script>
import axios from "axios";

export default {
  name: "servicesBooking",
  data() {
    return {
      isClickCreate: false,
      isClickService: false,
      isClickSeat: false,
      isClickTable: false,
      isClickRoom: false,
      Cines: [],
      Restaurant: [],
      Motel: [],
      Seat: [],
      Rooms: [],
      Tables: [],
    };
  },
  methods: {
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
    GetSeat(nameCine) {
      axios
        .get("https://localhost:7093/api/Cine/GetSeats", {
          params: { nameCine: nameCine },
        })
        .then((response) => {
          this.isClickService = true;
          this.Seat = response.data;
          this.isClickSeat = true;
        })
        .catch((error) => {
          alert("Algo anda mal...");
          console.log(error);
        });
    },
    GetRoom(nameMotel) {
      axios
        .get("https://localhost:7093/api/Motel/GetRooms", {
          params: { nameMotel: nameMotel },
        })
        .then((response) => {
          this.isClickService = true;
          this.Rooms = response.data;
          this.isClickRoom = true;
        })
        .catch((error) => {
          alert("Algo anda mal...");
          console.log(error);
        });
    },
    GetTable(nameRestaurant) {
      axios
        .get("https://localhost:7093/api/Restaurant/GetTables", {
          params: { nameRestaurant: nameRestaurant },
        })
        .then((response) => {
          this.isClickService = true;
          this.Tables = response.data;
          this.isClickTable = true;
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
          <td id="nameService" @click="GetSeat(Cines.name)">{{ Cines.name }}</td>
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
          <td id="nameService" @click="GetRoom(Motel.name)">{{ Motel.name }}</td>
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
          <td id="nameService" @click="GetTable(Restaurant.name)">
            {{ Restaurant.name }}
          </td>
          <td>{{ Restaurant.address }}</td>
        </tr>
      </table>
    </div>
  </div>

  <div class="seatServices" v-show="isClickService">
    <p>Seleccione un sitio:</p>
    <div class="viewSeat">
      <table border="1" v-show="isClickSeat">
        <tr>
          <td>Fila</td>
          <td>Sitio</td>
          <td>Sala</td>
          <td>Disponible</td>
        </tr>
        <tr v-for="(seat, index) in Seat" :key="index">
          <td>{{ seat.row }}</td>
          <td>{{ seat.id }}</td>
          <td>{{ seat.room }}</td>
          <td>{{ seat.available }}</td>
        </tr>
      </table>
      <table border="1" v-show="isClickTable">
        <tr>
          <td>N* Mesa</td>
          <td>Numero asientos</td>
          <td>Disponible</td>
        </tr>
        <tr v-for="(table, index) in Tables" :key="index">
          <td>{{ table.id }}</td>
          <td>{{ table.numberSeats }}</td>
          <td>{{ table.available }}</td>
        </tr>
      </table>
      <table border="1" v-show="isClickRoom">
        <tr>
          <td>N* Habitacion</td>
          <td>Tamaño</td>
          <td>Disponible</td>
        </tr>
        <tr v-for="(room, index) in Rooms" :key="index">
          <td>{{ room.id }}</td>
          <td>{{ room.size }}</td>
          <td>{{ room.available }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style>
.services {
  margin: auto;
  font-family: monospace;
  text-align: center;
}

.viewService {
  display: flex;
  margin-left: 15%;
}

.seatServices {
  margin: auto;
  font-family: monospace;
  text-align: center;
}

.seatServices table {
  margin-left: 45%;
}

#nameService:hover {
  background-color: rgb(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
}
</style>
