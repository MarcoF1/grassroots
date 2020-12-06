<template>
  <div>
    <div class='map'>
      <Navbar/>
      <div class='side'>
        <div v-if='messages.length' class="success-message" style="text-align:center;">
          <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
        </div>
        <div v-if='errors.length' class="error-message" style="width: 250px;">
          <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
          </ul>
        </div>
        <ul class="districts">
          <li v-for="district in districts" v-bind:key="district"> 
            <p>District {{district.name}}</p>
            <router-link :to="`district/${district.id}`">
              <button v-bind:class="{ selected: $route.name  == 'account'}" class="button">Inspect</button>
            </router-link>
          </li>
        </ul>
        <Map/>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .side {
    display: flex;
  }
  .districts {
    margin-right: 32px;
    width: 20%;
  }
</style>

<script>
import Account from "../components/Account.vue";
import Navbar from "../components/Navbar.vue";
import Map from "../components/Map.vue";
import axios from "axios";

export default {
  name: "account",
  components: {
    Account,
    Navbar,
    Map
  },
  created: function() {
    axios
      .get("/api/districts")
      .then((req) => {
        // handle success
        this.districts = req.data.districts;
      })
      .catch(err => {
        // handle error
        this.errors.push(err.response.data.error);
      })
      .then(() => {
        // always executed
        this.resetForm();
        this.clearMessages();
      });
  },
  data() {
    return {
      errors: [],
      messages: [],
      districts: [],
    }
  },
};
</script>
