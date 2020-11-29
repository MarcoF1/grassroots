<template>
  <div>
    <Navbar/>
    <h1>Feed</h1>
    <Feed/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Feed from "../components/Feed.vue";

export default {
  name: "feed",
  components: {
    Navbar,
    Feed
  }
};
</script>
