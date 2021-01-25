<template>
  <div>
    
    <Navbar/>
    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
    <div class="governments">
      <div v-for="government in governments" v-bind:key="government" class="government"> 
        <p><strong>Name: {{government.name}}</strong></p>
        <p>{{government.description}}</p>
        <p>Reps: {{government.reps.length}}</p>
        <p>Members: {{government.users.length}}</p>
        <router-link :to="`government/${government.government_id}`">
          <button v-bind:class="{ selected: $route.name  == 'account'}" class="button">View</button>
        </router-link>
      </div>
    </div>
    
  </div>
</template>
<style scoped>
  .governments {
    margin: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .government {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #ddd;
    margin-bottom: 16px;
    width: 50%;
  }
  @media only screen and (max-width: 800px) {
    .government {
      width: 100%;
    }
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
      .get("/api/governments")
      .then((req) => {
        // handle success
        this.governments = req.data.governments;
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
      governments: [],
    }
  },
};
</script>
