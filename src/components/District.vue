<template>
  <div>
    <Navbar/>
    <div class="wrap">
      <div class="top">
        <div>
        <LocationMap :coordinate="[42.3526, -71.1097]"/>
        <h1>Bronx - New York's 14th congressional district</h1>
        <h2>Alexandria Ocasio-Cortez</h2>
        <button class="button">Follow</button>
        <p>New York's 14th congressional district is a congressional district for the United States House of Representatives located in New York City, represented by Democrat Alexandria Ocasio-Cortez.

The district includes the eastern part of The Bronx and part of north-central Queens. The Queens portion includes the neighborhoods of Astoria, College Point, Corona, East Elmhurst, Elmhurst, Jackson Heights, and Woodside. The Bronx portion of the district includes the neighborhoods of City Island, Country Club, Van Nest, Morris Park, Parkchester, Pelham Bay, Schuylerville, and Throggs Neck. Roughly half of the population of the district is of Hispanic or Latino heritage, making it one of the more Latino districts in New York. Before redistricting for the 2012 election, much of the area was in New York's 7th congressional district.</p>
        
        <h1>Posts</h1>
        </div>
        <div>
          <img class="headshot" :src="'https://images-na.ssl-images-amazon.com/images/I/81XQCj3W5kL._AC_SL1500_.jpg'">
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