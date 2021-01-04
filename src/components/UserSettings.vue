<template>
  <div class="wrapper">
    <h1>
      Hello {{username}}!
    </h1>
    <SignOut/>
    <ChangeUsername/>
    <ChangePassword/>
    <div class = "side">
      <div class="col">
        <h1>
          Posts
        </h1>
        <div v-if="posts.length==0">
          No posts yet!
        </div>
        <div v-else>
          <Post  v-for="post in posts.slice().reverse()" :post="post" v-bind:key="post"/>
        </div>
      </div>
      <div class="col">
        <h1>
          Districts
        </h1>
        <div v-if="districts.length==0">
          No districts yet!
        </div>
        <div v-else>
          <div  v-for="district in districts.slice().reverse()" v-bind:key="district">
            {{district}}
          <div/>
        </div>
      </div>
    </div>
    </div>
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
      errors: [],
      username: this.$cookie.get('auth'),
      posts: [],
      districts: []
    }
  },
  components: {
    SignOut,
    ChangeUsername,
    ChangePassword,
    Post
  },
  methods: {
    getPosts: function() {
      axios
        .get(`/api/posts/username/${this.username}` )
        .then((res) => {
          this.posts = res.data.posts;
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
    },
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
    this.getPosts()
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