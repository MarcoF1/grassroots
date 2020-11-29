<template>
  <div></div>
</template>
<script>

import L from "leaflet";
import { findRealParent } from "vue2-leaflet";
import LeafletSearch from "leaflet-search";

export default {
  name: "SearchBar",
  data() {
    return {};
  },
  mounted() {
    this.parentContainer = findRealParent(this.$parent);
    this.parentContainer.mapObject.addControl(
      new L.Control.Search({
        url: "https://nominatim.openstreetmap.org/search?format=json&q={s}",
        jsonpParam: "json_callback",
        propertyName: "display_name",
        // layer: , add a layer which is a L.LayerGroup to search for our markers, documentation here https://github.com/stefanocudini/leaflet-search
        propertyLoc: ["lat", "lon"],
        marker: false,
        autoCollapse: true,
        autoType: true,
        minLength: 1,
        zoom: 14,
        position: 'topright'
      })
    );
  },
  methods: {
    leafletSearcInit() {
      LeafletSearch;
    }
  }
};
</script>

<style>
@import "~leaflet-search/src/leaflet-search.css";
</style>