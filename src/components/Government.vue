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
            <About v-bind:government="government" v-bind:isRep="isRep" v-bind:isMember="isMember" v-bind:isSignedIn="isSignedIn"/>
          </tab>
          <tab title="Resources">
            <Resources v-bind:government="government" v-bind:isRep="isRep" v-bind:isMember="isMember"/>
          </tab>
          <tab title="Representatives">
            <Representatives v-bind:government="government" v-bind:isRep="isRep" v-bind:isMember="isMember"/>
          </tab>
          <tab title="Bills">
            <Bills v-bind:government="government" v-bind:isRep="isRep" v-bind:isMember="isMember"/>
          </tab>
          <tab v-if="isSignedIn" title="Profile">
            <Profile v-bind:government="government" v-bind:isRep="isRep" v-bind:isMember="isMember"/>
          </tab>
        </Tabs>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .wrap {
    left: 300px;
    top: 32px;
    position: absolute;
  }
  .overview {
    width: 1200px;
  }
</style>

<script>
import LocationMap from "../components/LocationMap.vue";
import Representatives from "./Representatives.vue";
import Navbar from "../components/Navbar.vue";
import Tabs from "../components/Tabs.vue";
import Tab from "../components/Tab.vue";
import Bills from "./Bills.vue";
import Resources from "./Resources.vue";
import About from "./About.vue";
import Profile from "./Profile.vue";


import axios from "axios";


export default {
  name: "Government",

  data() {
    return {
      government: {},
      government_id: parseInt(this.$route.params.id),
      isRep: false,
      isMember: false,
      isSignedIn: this.$cookie.get('auth') ? true : false,
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
    About,
    Resources,
    Profile
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