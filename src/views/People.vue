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
    <div class="wrapper">
      <ul>
        <li v-for="user in users" v-bind:key="user">
            <h1>{{user.username}}</h1>
            <router-link :to="`user/${user.user_id}`">
              <button v-bind:class="{ selected: $route.name  == 'account'}" class="button">Account</button>
            </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    margin: 32px
  }
</style>

<script>
import axios from "axios";
import Navbar from "../components/Navbar.vue";

export default {
  name: "People",

  data() {
    return {
      users: [],
      messages: [],
      errors: []
    }
  },
  components: {
    Navbar
  },
  created: function() {
      axios
        .get("/api/users")
        .then((res) => {
          // handle success
          this.users = res.data;
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
  methods: {},
  resetForm: function() {
    this.username = ""
  },

  clearMessages: function() {
    setInterval(() => {
      this.errors = [];
    }, 5000);
  }
}
</script>
