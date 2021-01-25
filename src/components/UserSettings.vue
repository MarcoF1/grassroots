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
    <SignOut/>
    <ChangeUsername/>
    <ChangePassword/>
    <h1>
      Governments
    </h1>
    <div v-for="gov in governments" v-bind:key="gov">
        {{gov}}
    </div>
    <h1>
      My Governments
    </h1>
    <div v-for="gov in myGovernments" v-bind:key="gov">
        {{gov}}
    </div>
    <h1>
      Join new Government
    </h1>
    <form id="join-government" class='component' v-on:submit.prevent="joinGovernment" method="post">
      <input id='govID' v-model.trim='govID' type='text' name='govID' placeholder="Government ID">
      <input type='submit' value='Add' class="button">
    </form>
    <h1>
      Leave Government
    </h1>
    <form id="leave-government" class='component' v-on:submit.prevent="leaveGovernment" method="post">
      <input id='govID' v-model.trim='govID' type='text' name='govID' placeholder="Government ID">
      <input type='submit' value='Leave' class="button">
    </form>
    <h1>
      Create New Government
    </h1>
    <form id="add-government" class='component' v-on:submit.prevent="addGovernment" method="post">
      <input id='govName' v-model.trim='govName' type='text' name='govName' placeholder="Name">
      <input id='govDescription' v-model.trim='govDescription' type='text' name='govDescription' placeholder="Description">
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
import Post from "./Post.vue";
import axios from "axios";
import { eventBus } from "../main";


export default {
  name: "UserSettings",

  data() {
    return {
      username: this.$cookie.get('auth'),
      govName: "",
      govDescription: "",
      govID: null,
      myGovernments: [],
      governments: [],
      messages: [],
      errors: [],
    }
  },
  components: {
    SignOut,
    ChangeUsername,
    ChangePassword,
    Post
  },
  methods: {
    addGovernment: function() {
      const bodyContent = { name: this.govName, description: this.govDescription};
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
    joinGovernment: function() {
      const bodyContent = { government_id: this.govID};
      axios
        .post(`/api/governments/join`, bodyContent)
        .then(() => {
          this.messages.push("Joined new government!!")
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
    leaveGovernment: function() {
      axios
        .delete(`/api/governments/leave/${this.govID}`)
        .then(() => {
          this.messages.push("Left government")
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
    getGovernments: function() {
      axios
        .get(`/api/governments`)
        .then((res) => {
          this.governments = res.data.governments
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
    getMyGovernments: function() {
      axios
        .get(`/api/governments/my`)
        .then((res) => {
          this.myGovernments = res.data.governments
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
    this.getGovernments()
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