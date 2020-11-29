<template>
  <div>
    <Navbar/>
    <div class="wrap">
      <div class="top">
        <div>
          <h1>Rep Name</h1>
          <p>ID:{{ $route.params.id }}</p>
          <p>Address:</p>
          <p>Phone Number:</p>
          <p>Rating: 4/5</p>
          <p>Wait Time: 2 hrs</p>
          <p>Notes</p>
        </div>
        <LocationMap :coordinate="[42.3526, -71.1097]"/>
      </div>

      <h1>Vaccines Available</h1>
      <div v-if="vaccines.length">
        <div
          v-for="vaccine in vaccines"
          v-bind:key="vaccine"
          >
          {{vaccine}}
        </div>
      </div>
      <h1>Payments Available</h1>
      <div v-if="payments.length">
        <div
          v-for="payment in payments"
          v-bind:key="payment"
          >
          {{payment}}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .button {
    margin: 32px;
  }
  .input {
    margin: 16px;
  }
  .wrap {
    padding: 32px
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding-right: 32px;
    padding-top: 32px;
  }
</style>

<script>
import LocationMap from "../components/LocationMap.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "Representative",

  data() {
    return {
      errors: [],
      vaccines: ['vaccine A', 'vaccine B'],
      payments: ['payment A', 'payment B']
    }
  },
  components: {
    LocationMap,
    Navbar
  },
}
</script>

<style scoped>
form {
  width: fit-content;
}

input[type="text"],
input[type="url"] {
  width: 15rem;
}
</style>