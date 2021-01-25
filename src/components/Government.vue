<template>
  <div>
    <Navbar/>
    <div class="wrap">
      <div class="top">
        <div>
        <div v-if='messages.length' class="success-message" style="text-align:center;">
          <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
        </div>
        <div v-if='errors.length' class="error-message" style="width: 250px;">
          <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
          </ul>
        </div>
        </div>
      </div>
      

      <div class="overview">
        <Tabs :mode="mode">
          <tab title="Home">
              <h1>Name: {{government.name}}</h1>
              <h1>Description: {{government.name}}</h1>
          </tab>
          <tab title="Representatives">
            Representatives will go here!
          </tab>
          <tab title="Bills">
            Bills will go here!
          </tab>
          <tab title="Calendar">
            Calendar will go here!
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
  .top {
    display: flex;
    justify-content: space-between;
    padding-right: 32px;
    padding-top: 32px;
    width: 50%;
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
import Navbar from "../components/Navbar.vue";
import Tabs from "../components/Tabs.vue";
import Tab from "../components/Tab.vue";
import Post from "./Post.vue";
import axios from "axios";

export default {
  name: "District",

  data() {
    return {
      government: {},
      posts: [],
      displayPosts: [],
      id: parseInt(this.$route.params.id),
      messages: [],
      errors: [],
    }
  },
  components: {
    LocationMap,
    Navbar,
    Post,
    Tabs,
    Tab
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
        .get(`/api/governments/id/${this.id}` )
        .then((res) => {
          this.government = res.data.government;
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          this.getPosts()
        });
    }}
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