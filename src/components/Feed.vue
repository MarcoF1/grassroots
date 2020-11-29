<template>
  <div>
    <div class="wrapper">
      <Post v-for="post in posts" :post="post" v-bind:key="post"/>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    margin: 32px
  }
</style>

<script>
import Post from "./Post.vue";

export default {
  name: "Feed",

  data() {
    return {
      posts: [
        {text: "AOC is great"},
        {text: "AOC is great"},
        {text: "AOC is great"}]
    }
  },
  components: {
    Post
  },
}
</script>
