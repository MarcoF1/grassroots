<template>
  <div id='map' class="map">
    <l-map
      :zoom="zoom"
      :center="center"
      class="map"
    >
      <l-tile-layer :url="url"/>
      <l-marker
        :key="center"
        :lat-lng="center"
        :name="center"
      >
        <l-popup :content="center" />
      </l-marker>
    </l-map>
  </div>
</template>
<style scoped>
  .map {
    height: 300px;
    width: 300px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #eee;
  }
</style>

<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import L from 'leaflet';
import SearchBar from "./SearchBar.vue";

// the two lines below are bc theres a bug with leaflet + webpack for rendering markers and I just copied and pasted the solution from here https://github.com/vue-leaflet/Vue2Leaflet/issues/96
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  name: "LocationMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    SearchBar
  },
  props: [
    'coordinate'
  ],
  data() {
    return {
      zoom: 14,
      center: L.latLng(this.coordinate[0], this.coordinate[1]),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      currentZoom: 14,
      searched: ""
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    }
  }
};
</script>
