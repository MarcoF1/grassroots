<template>
  <div>
    <Navbar/>
    <div class="wrap">
      <div class="top">
        <div>
          <img class="headshot" :src="'https://images-na.ssl-images-amazon.com/images/I/81XQCj3W5kL._AC_SL1500_.jpg'">
          <h1>Alexandria Ocasio-Cortez</h1>
          <h2>Bronx</h2>
          <button class="button">Follow</button>
          <p>I am AOC and people love me</p>
          <h3>Email aoc@ny.gov</h3>
          <h3>Twitter @AOC</h3>
          <h3>Twitch @AOC</h3>
          <h3>IG @AOC</h3>

          <h1>Posts:</h1>
        </div>
        <LocationMap :coordinate="[42.3526, -71.1097]"/>
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
import LocationMap from "../components/LocationMap.vue";
import Navbar from "../components/Navbar.vue";
import Post from "./Post.vue";

export default {
  name: "Representative",

  data() {
    return {
      posts: [
        {text: "AOC is great"},
        {text: "AOC is great"},
        {text: "AOC is great"}
        ]
    }
  },
  components: {
    LocationMap,
    Navbar,
    Post
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