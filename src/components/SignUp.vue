<template>
  <div>
    <h2>Welcome to Grassroots!</h2>
    Login before proceeding with yor Grassroots account!
    <div class="wrap">
      <input
        class="input"
        id="signInUsername"
        v-model.trim="signInUsername"
        type="text"
        name="signInUsername"
        placeholder="Username"
      />
      <input
        class="input"
        id="signInPassword"
        v-model.trim="signInPassword"
        type="password"
        name="signInPassword"
        placeholder="Password"
      />
    </div>
    <button class="button" v-on:click="signIn">Sign In</button>
    <br />

    Don't have an account? Start here!
    <div class="wrap">
      <input
        class="input"
        id="signUpUsername"
        v-model.trim="signUpUsername"
        type="text"
        name="signUpUsername"
        placeholder="Username"
      />
      <input
        class="input"
        id="signUpPassword"
        v-model.trim="signUpPassword"
        type="password"
        name="signUpPassword"
        placeholder="Password"
      />
    </div>
    <button class="button" v-on:click="signUp">Sign Up</button>

    <div v-if="errors.length" class="error-message" style="width: 250px;">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error.id">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.button {
  margin: 32px;
}
.input {
  margin: 16px;
}
.wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "SignUp",

  data() {
    return {
      errors: [],
      signUpUsername: "",
      signUpPassword: "",
      signInUsername: "",
      signInPassword: "",
    };
  },

  methods: {
    signUp: function() {
      const bodyContent = {
        username: this.signUpUsername,
        password: this.signUpPassword,
      };
      axios
        .post("/api/users", bodyContent)
        .then(() => {
          // handle success
          eventBus.$emit("signup-success", true);
        })
        .catch((err) => {
          // handle error
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          // always executed
          this.resetForm();
          this.clearMessages();
        });
    },
    signIn: function() {
      const bodyContent = {
        username: this.signInUsername,
        password: this.signInPassword,
      };
      axios
        .post("/api/users/session", bodyContent)
        .then((res) => {
          // handle success
          eventBus.$emit("signin-success", res.data.user);
        })
        .catch((err) => {
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
      this.signUpUsername = "";
      this.signUpPassword = "";
      this.signInUsername = "";
      this.signInPassword = "";
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    },
  },
};
</script>

<style scoped>
form {
  width: fit-content;
}

input[type="password"],
input[type="text"],
input[type="url"] {
  width: 15rem;
}
</style>
