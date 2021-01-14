<template>
  <div>
    <div class="wrapper">
      <div v-if='errors.length' class="error-message">
        <ul>
          <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
        </ul>
      </div>
      <div v-for="post in posts.slice().reverse()" v-bind:key="post">
        <Post :post="post"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import Post from "./Post.vue";
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "Feed",

  data() {
    return {
      posts: [],
      errors: [],
      messages: []
    }
  },
  components: {
    Post
  },
  created: function() {
    eventBus.$on("post-success", (post) => {
      this.posts.push(post);
    });

    axios
      .get(`/api/posts`)
      .then((res) => {
        // handle success
        this.posts = res.data.posts;
      })
      .catch(err => {
        // handle error 
        this.errors.push(err.response.data.error);
      })
      .then(() => {
        // always executed
        this.clearMessages()
        this.resetForm()
      });
    
  }
}
</script>
