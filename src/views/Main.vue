<template>
  <div>
    <Navbar/>
    <h1>Katalog</h1>
    <p>Do you know who your state rep is?</p>
    <p>Do you know what bills and projects are being talked about in your local government?</p>
    <p>Katalog makes it easy to find this and other infromation about your state reps</p>
    <router-link :to="`district/${Math.ceil(Math.random()*100)}`">
      <button class="button">District </button>
    </router-link>
    {{' '}}
    <router-link :to="`rep/${Math.ceil(Math.random()*100)}`">
      <button class="button">Rep </button>
    </router-link>
    {{' '}}
    <router-link :to="`bill/${Math.ceil(Math.random()*100)}`">
      <button class="button">Bill </button>
    </router-link>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
  name: "Main",
  components: {
    Navbar
  }
};
</script>
