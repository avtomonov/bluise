<template>
    <div id="map"></div>
</template>

<script>
import { ref } from "vue";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import constants from "@/constants.js";

// import { mapStores } from "pinia";

export default {
  data() {
    return {
      // theme: ref("dark"),
      // address: null,
      // currentItemSet: false,
      // vehicleKey: null,
      // failSnack: false,
      // failSnackMsg: "Sorry, something went wrong on our end. Please try again.",
      // onDirections: false,
      // map: null,
      // location: null,
      // tripActive: false,
      // directions: null,

      usersList: [{
        "_id": {
          "$oid": "640de167a0fc8d4c0c930242"
        },
        "name": "Автомонов Андрей",
        "location": [
          37.582107,55.894369
        ],
        "imageUrl": "https://tesla-cdn.thron.com/delivery/public/image/tesla/c82315a6-ac99-464a-a753-c26bc0fb647d/bvlatuR/std/1200x628/lhd-model-3-social",
        "_class": "com.brk.CarShare.Entities.Vehicle"
      }]
    };
  },
//   computed: {
//     ...mapStores({}),
//   },
  async mounted() {
    navigator.geolocation.watchPosition(this.getCurrentPosition);

    mapboxgl.accessToken = constants.accessToken;
    this.map = new mapboxgl.Map({
      container: "map",
      style: constants.mapStyle,
      center: [37.6156, 55.7522],
      zoom: 10,
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    // await this.vehicleStore.loadVehicles(this.$http);
    // this.vehiclesList = this.vehicleStore.vehicleList;

    this.map.on("load", () => {
      this.map.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error, image) => {
          if (error) throw error;
          this.map.addImage("custom-marker", image);
        }
      );
      let pointFeatures = [];

      this.usersList.forEach((user) => {
        pointFeatures.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [user.location[0], user.location[1]],
          },
          properties: {
            title: user.name,
          },
        });
      });

      this.map.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: pointFeatures,
        },
      });

      this.map.addLayer({
        id: "points",
        type: "symbol",
        source: "points",
        layout: {
          "icon-image": "custom-marker",
          // get the title name from the source's "title" property
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 1.25],
          "text-anchor": "top",
        },
      });
    });

    this.getCurrentPosition();
    // this.vehiclesList.map(async (vehicle) => {
    //   vehicle.address = await this.getAddressFromLocation(vehicle.location);
    // });
  },
  methods: {
    getCurrentPosition: function () {
      navigator.geolocation.getCurrentPosition(async (location) => {
        this.location = [location.coords.longitude, location.coords.latitude];
        this.address = await this.getAddressFromLocation(this.location);
      });
    },
    // onClick() {
    //   this.theme = this.theme === "light" ? "dark" : "light";
    // },
    // openOrderModal(item) {
    //   this.currentItemStore.setCurrentItem(item);
    //   this.currentItemSet = true;
    // },
    // async orderVehicle(vehicle) {
    //   vehicle.status = "Booked";
    //   this.currentItemSet = false;

    //   this.vehicleKey = await this.$http.get("/api/key/generate");
    //   this.onDirections = true;
    //   try {
    //     // const ndef = new NDEFReader();
    //     // await ndef.write(this.vehicleKey);
    //     let resp = await this.$http.patch("api/vehicle/update", vehicle);
    //     if (resp.status === 200) {
    //       this.currentItemStore.setCurrentItem(vehicle);
    //       delete vehicle.address;
    //       resp = await this.$http.post(
    //         `api/trip/start?userId=${this.userStore.user.sub}`,
    //         vehicle
    //       );
    //       this.onDirections = false;
    //       this.currentItemStore.setCurrentTrip(resp.data);
    //       this.tripActive = true;
    //       // this.map.addControl(this.directions, "top-left");
    //     } else {
    //       this.failSnackMsg =
    //         "There was an issue booking your vehicle, please try again.";
    //       this.failSnack = true;
    //     }
    //   } catch (error) {
    //     console.error("NDEF error: " + error);
    //     this.onDirections = false;
    //     this.failSnackMsg = "Your device doesn't support this action";
    //     this.failSnack = true;
    //   }
    // },
    async getAddressFromLocation(location) {
      let response = await this.$http.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location[0]},${location[1]}.json?access_token=${constants.accessToken}&country=HR`
      );
      return response.data.features[0].place_name;
    },
    // async endTrip() {
    //   // this.map.removeControl(this.directions);
    //   navigator.geolocation.getCurrentPosition(async (location) => {
    //     this.location = [location.coords.longitude, location.coords.latitude];
    //   });
    //   await this.$http.post(
    //     `api/trip/end?location=${this.location}`,
    //     this.currentItemStore.currentTrip
    //   );
    //   let vehicle = this.currentItemStore.currentItem;
    //   vehicle.status = "Available";
    //   await this.$http.patch(`api/vehicle/update`, vehicle);
    //   this.onDirections = false;
    //   this.currentItemStore.clearCurrentTrip();
    //   this.tripActive = false;
    //   this.vehiclesList.map(async (vehicle) => {
    //     vehicle.address = await this.getAddressFromLocation(vehicle.location);
    //   });
    // },
  },
};
</script>


<style lang="scss" scoped>
    #map {
        height: 100vh;
        width: 100vw;
    }
</style>