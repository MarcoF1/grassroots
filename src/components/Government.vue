<template>
  <div>
    <Navbar/>
    <div class="wrap">
      <div class="top">
          <div v-if='messages.length' class="success-message" style="text-align:center;">
            <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
          </div>
          <div v-if='errors.length' class="error-message" style="width: 250px;">
            <ul>
              <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
            </ul>
          </div>
      </div>
    
      <div class="overview">
        <Tabs :mode="mode">
          <tab title="Home">
            <About v-bind:government="government" v-bind:isRep="isRep" v-bind:isMember="isMember"/>
          </tab>

          <tab title="Representatives">
            <Representatives v-bind:government="government" v-bind:isRep="isRep" v-bind:isMember="isMember"/>
          </tab>
          <tab title="Bills">
            <Bills v-bind:government="government" v-bind:isRep="isRep" v-bind:isMember="isMember"/>
          </tab>
          <tab title="Calendar">
            Calendar will go here
          </tab>
        </Tabs>
      </div>
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
  
  .overview {
    width: 50%;
  }
  
  @media only screen and (max-width: 800px) {
    .overview {
      width: 100%;
    }
    .top {
      width: 100%;
    }
  }
</style>

<script>
import LocationMap from "../components/LocationMap.vue";
import Representatives from "./Representatives.vue";
import Navbar from "../components/Navbar.vue";
import Tabs from "../components/Tabs.vue";
import Tab from "../components/Tab.vue";
import Bills from "./Bills.vue";
import About from "./About.vue";

import axios from "axios";


export default {
  name: "Government",

  data() {
    return {
      government: {},
      government_id: parseInt(this.$route.params.id),
      isRep: false,
      isMember: false,
      user_id: this.$cookie.get('auth-id'),
      messages: [],
      errors: [],
    }
  },
  components: {
    LocationMap,
    Navbar,
    Tabs,
    Tab,
    Bills,
    Representatives,
    About
  },
  created: function() {
    this.getGovernment()
  },
  methods: {
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.messages = [];
      }, 5000);
    },
    getGovernment: function() {
      axios
        .get(`/api/governments/id/${this.government_id}` )
        .then((res) => {
          this.government = res.data.government;
          this.isRep = this.government.reps.some( rep => rep.user_id == this.$cookie.get('auth-id'))
          this.isMember = this.government.users.some( member => member.user_id == this.$cookie.get('auth-id'))
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
    },
    }
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