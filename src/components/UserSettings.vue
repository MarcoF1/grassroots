<template>
  <div>
    <h1>
      Hello {{username}}!
    </h1>
    <SignOut/>
    <ChangeUsername/>
    <ChangePassword/>
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
import SignOut from "./SignOut.vue";
import ChangePassword from "./ChangePassword.vue";
import ChangeUsername from "./ChangeUsername.vue";
import { eventBus } from "../main";


export default {
  name: "UserSettings",

  data() {
    return {
      errors: [],
      username: this.$cookie.get('auth')
    }
  },
  components: {
    SignOut,
    ChangeUsername,
    ChangePassword,
  },
  methods: {
    
    resetForm: function() {
      this.username = this.$cookie.get('auth')
    },

    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    }
  },
  created: function() {
    eventBus.$on("change-username-success", (userName) => {
      this.username = userName;
    });
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