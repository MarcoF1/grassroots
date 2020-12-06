<template>
  <div>
    <Navbar/>
    <AddPost/>
    <Feed/>
  </div>
</template>

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
