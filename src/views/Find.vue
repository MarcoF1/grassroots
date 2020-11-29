<template>
  <div>
    <div class='map'>
      <Navbar/>
      <Map/>
    </div>
  </div>
</template>

<script>
import Account from "../components/Account.vue";
import Navbar from "../components/Navbar.vue";
import Map from "../components/Map.vue";

export default {
  name: "account",
  components: {
    Account,
    Navbar,
    Map
  }
};
</script>
