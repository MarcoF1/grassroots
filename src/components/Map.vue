<template>
  <div id='map'>
    <l-map
      :zoom="zoom"
      :center="center"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <SearchBar/>

      <l-tile-layer :url="url"/>

      <l-marker
        v-for="place in vaccineLocations"
        :key="place.id"
        :lat-lng="place.coordinate"
        :name="place.name"
      >
        <l-popup :content="place.name" />
      </l-marker>

    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import L from 'leaflet';
import SearchBar from "./SearchBar.vue";
import axios from "axios";
import { eventBus } from "../main";


// the two lines below are bc theres a bug with leaflet + webpack for rendering markers and I just copied and pasted the solution from here https://github.com/vue-leaflet/Vue2Leaflet/issues/96
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    SearchBar
  },
  data() {
    return {
      zoom: 14,
      center: L.latLng(42.3526, -71.1097),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      currentZoom: 14,
      currentCenter: L.latLng(42.3736, -71.1097),
      searched: "",
      vaccineLocations: [
        {id: 1, name: "place 1", coordinate: L.latLng(42.337441, -71.104794)},
        {id: 2, name: "place 2", coordinate: L.latLng(42.338365, -71.108303)}
      ]
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    formatVaccineLocations(locations) {
      let formattedData = []

      locations.forEach((location, i) => {
        formattedData.push({
          id: i,
          name: location.vaccine,
          coordinate: L.latLng(location.location.split(","))
        })
      });
      return formattedData;
    },    
    vaccineLocationsUpdate(locations) {
      this.vaccineLocations = this.formatVaccineLocations(locations);
    },
    getPharmacies() {
      const body = { };
        axios
          .get("/api/pharmacies", body)
          .then((res) => {
            this.vaccineLocationsUpdate(res.data);
          })
          .catch(err => {
            eventBus.$emit("failed to load pharmacies", err);
          });
    }
  },
  created() {
    this.getPharmacies();
  }  

};
</script>

<style scoped>
#map {
  width: 99vw;
  height: 99vh;
}
</style>