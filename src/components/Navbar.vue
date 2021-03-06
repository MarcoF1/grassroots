<template>
  <div class="nav-bar">
    <div class="center">
      <router-link to="/">
        <button v-bind:class="{ selected: $route.name  == 'main'}" class="button">Home</button>
      </router-link>
      <router-link to="/governments">
        <button v-bind:class="{ selected: $route.name  == 'governments'}" class="button">Governments</button>
      </router-link>
      <div v-for="gov in governments" v-bind:key="gov.government_id">
        <router-link :to="`../government/${gov.government_id}`">
          <button v-bind:class="{ selected: $route.name  == `government` && $route.params.id == gov.government_id}" class="button">{{gov.name}}</button>
        </router-link>
      </div>
    </div>
    <router-link to="/account">
      <button v-bind:class="{ selected: $route.name  == 'account'}" class="button">Settings</button>
    </router-link>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "NavBar",
  data() {
    return {
      governments: []
    }
  },
  created: function() {
      axios
        .get("/api/governments/my")
        .then((res) => {
          // handle success
          this.governments = res.data.governments;
          
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
    }
};
</script>

<style scoped>
  .button {
    margin: 8px;
  }
  .selected {
    background: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    border: 2px black solid
  }
  .nav-bar {
    display: flex;
    align-items:center;
    justify-content:space-between;
    flex-direction: column;
    position: absolute;
    left: 32px;
    top: 32px;
    height: 90vh;
  }

</style>



