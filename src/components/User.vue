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
      <div class="top">
        <div>
          <h1>{{user.username}}</h1>
        </div>
      </div>
      <Post v-for="post in posts" :post="post" v-bind:key="post"/>
    </div>
  </div>
</template>
<style scoped>
  .wrap {
    padding: 32px
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding-right: 32px;
    padding-top: 32px;
  }
  .headshot {
    height: 300px;
  }
</style>

<script>
import Navbar from "../components/Navbar.vue";
import Post from "./Post.vue";
import axios from "axios";

export default {
  name: "User",

  data() {
    return {
      posts: [],
      user: {},
      id: parseInt(this.$route.params.id),
      errors: [],
      messages: []
    }
  },
  components: {
    Navbar,
    Post
  },
  created: function() {
    this.getUser()
  },
  methods: {
    getUser: function() {
      axios
        .get(`/api/users/${this.id}` )
        .then((res) => {
          this.user = res.data;
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
        .then(() => {
          this.getPosts()
        });
    },
    getPosts: function() {
      
      axios
        .get(`/api/posts/user/${this.id}` )
        .then((res) => {
          this.posts = res.data.posts;
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
        .then(() => {

        });
    },
  },
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