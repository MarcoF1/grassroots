<template>
  <div>
    
    <Navbar/>
    <div class="wrap">
      <div v-if='messages.length' class="success-message" style="text-align:center;">
        <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
      </div>
      <div v-if='errors.length' class="error-message" style="width: 250px;">
        <ul>
          <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
        </ul>
      </div>
      <Tabs :mode="mode">
        <tab title="Mine">
          <div v-for="government in my_governments" v-bind:key="government.name" class="government"> 
            <p><strong>Name: {{government.name}}</strong></p>
            <p>{{government.description}}</p>
            <p>Reps: {{government.reps.length}}</p>
            <p>Members: {{government.users.length}}</p>
            <router-link :to="`government/${government.government_id}`">
              <button v-bind:class="{ selected: $route.name  == 'account'}" class="button">View</button>
            </router-link>
          </div>
        </tab>
        
        <tab title="All">
          <div v-for="government in governments" v-bind:key="government" class="government"> 
            <p><strong>Name: {{government.name}}</strong></p>
            <p>{{government.description}}</p>
            <p>Reps: {{government.reps.length}}</p>
            <p>Members: {{government.users.length}}</p>
            <router-link :to="`government/${government.government_id}`">
              <button v-bind:class="{ selected: $route.name  == 'account'}" class="button">View</button>
            </router-link>
          </div>
        </tab>
      </Tabs>

    </div>
    
    
    
  </div>
</template>
<style scoped>
  .wrap {
      padding: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  .government {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #ddd;
    margin-bottom: 16px;
    width: 600px;
  }

</style>

<script>
import Account from "../components/Account.vue";
import Navbar from "../components/Navbar.vue";
import Tabs from "../components/Tabs.vue";
import Tab from "../components/Tab.vue";
import axios from "axios";

export default {
  name: "account",
  components: {
    Account,
    Navbar,
    Tabs,
    Tab
  },
  created: function() {
    axios
      .get("/api/governments")
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
    axios
      .get("/api/governments/my")
      .then((res) => {
        // handle success
        this.my_governments = res.data.governments;
        
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
      my_governments: []
    }
  },
};
</script>
