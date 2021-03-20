<template>
  <div class="wrapper">
    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
    <h1>
      Hello {{username}}!
    </h1>
    <a href="/feedback"><button class="button">Give Feedback</button></a>
    <SignOut/>
    <ChangeUsername/>
    <ChangePassword/>
    <h1>
      Create New Government
    </h1>
    <form id="add-government" class='component' v-on:submit.prevent="addGovernment" method="post">
      <div class="wrapper">
        <input id='govName' v-model.trim='govName' type='text' name='govName' placeholder="Name">
        <input id='govDescription' v-model.trim='govDescription' type='text' name='govDescription' placeholder="Description">
        <input id='govContact' v-model.trim='govContact' type='text' name='govContact' placeholder="Contact Info">
        <input id='govAddress' v-model.trim='govAddress' type='text' name='govContact' placeholder="Address">
      </div>
      <input type='submit' value='Add' class="button">
    </form>
  </div>
</template>
<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .button {
    margin: 32px;
  }
  .input {
    margin: 16px;
  }
  .side {
    display: flex;
  }
  .col {
    margin: 32px;
    width: 700%;
  }
</style>

<script>
import SignOut from "./SignOut.vue";
import ChangePassword from "./ChangePassword.vue";
import ChangeUsername from "./ChangeUsername.vue";
import axios from "axios";
import { eventBus } from "../main";


export default {
  name: "UserSettings",

  data() {
    return {
      username: this.$cookie.get('auth'),
      govName: "",
      govDescription: "",
      govContact: "",
      govAddress: "",
      govID: null,
      messages: [],
      errors: [],
    }
  },
  components: {
    SignOut,
    ChangeUsername,
    ChangePassword
  },
  methods: {
    addGovernment: function() {
      const bodyContent = { name: this.govName, description: this.govDescription, contact: this.govContact, address: this.govAddress};
      axios
        .post(`/api/governments`, bodyContent)
        .then(() => {
          this.messages.push("New Government added!")
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
    resetForm: function() {
    },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.messages = [];
      }, 5000);
    }
  },
  created: function() {
    eventBus.$on("change-username-success", (userName) => {
      this.username = userName;
    });
    this.getMyGovernments()
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