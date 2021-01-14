<template>
  <div>
    <Navbar/>
    <div class="feed">
      <AddPost/>
      <Feed/>
    </div>
  </div>
</template>

<style scoped>
  .feed {
    display: flex;
    align-items: center;
    flex-direction: center;
    flex-direction: column;
  }
</style>

<script>
import Navbar from "../components/Navbar.vue";
import Feed from "../components/Feed.vue";
import AddPost from "../components/AddPost.vue";

export default {
  name: "feed",
  components: {
    Navbar,
    Feed,
    AddPost,
  }
};
</script>
