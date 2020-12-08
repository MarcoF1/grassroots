<template>
  <div>
    <Navbar/>
    <div class="wrap">
      <div class="top">
        <div>
        <LocationMap :coordinate="[42.3526, -71.1097]"/>
        <h1>{{district.name}}</h1>
        <h2>Alexandria Ocasio-Cortez</h2>
        <button class="button" v-on:click="tagChanged">Follow</button>
        <p>New York's 14th congressional district is a congressional district for the United States House of Representatives located in New York City, represented by Democrat Alexandria Ocasio-Cortez.
          The district includes the eastern part of The Bronx and part of north-central Queens. The Queens portion includes the neighborhoods of Astoria, College Point, Corona, East Elmhurst, Elmhurst, Jackson Heights, and Woodside. The Bronx portion of the district includes the neighborhoods of City Island, Country Club, Van Nest, Morris Park, Parkchester, Pelham Bay, Schuylerville, and Throggs Neck. Roughly half of the population of the district is of Hispanic or Latino heritage, making it one of the more Latino districts in New York. Before redistricting for the 2012 election, much of the area was in New York's 7th congressional district.</p>
        <div v-if='messages.length' class="success-message" style="text-align:center;">
          <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
        </div>
        <div v-if='errors.length' class="error-message" style="width: 250px;">
          <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
          </ul>
        </div>
        </div>
        <div>
          <img class="headshot" :src="'https://images-na.ssl-images-amazon.com/images/I/81XQCj3W5kL._AC_SL1500_.jpg'">
        </div>
      </div>

      <h1>Overview</h1>
      <Tabs :mode="mode">
        <tab title="Updates">Updates will go here!</tab>
        <tab title="Posts">
          <div>
            <vue-tags-input
              v-model="tag"
              :tags="tags"
              :autocomplete-items="filteredItems"
              @tags-changed="tagChanged"
              class = "add-tags"
            />
            <div v-if="displayPosts.length==0">
              <Post  v-for="post in posts.slice().reverse()" :post="post" v-bind:key="post"/>
            </div>
            <div v-else>
              <Post  v-for="post in displayPosts.slice().reverse()" :post="post" v-bind:key="post"/>
            </div>
          </div>
        </tab>
        <tab title="Schedule">Schedule will go here!</tab>
      </Tabs>
      
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
  .add-tags {
    margin-bottom: 32px;
  }
</style>

<script>
import LocationMap from "../components/LocationMap.vue";
import Navbar from "../components/Navbar.vue";
import Tabs from "../components/Tabs.vue";
import Tab from "../components/Tab.vue";
import Post from "./Post.vue";
import axios from "axios";
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: "District",

  data() {
    return {
      district: {},
      posts: [],
      displayPosts: [],
      id: parseInt(this.$route.params.id),
      messages: [],
      errors: [],
      tag: '',
      tags: [],
      mode: 'light',
      autocompleteItems: [{
        text: 'Disctict 1',
      }, {
        text: 'Disctict 2',
      }, {
        text: 'Health',
      }, {
        text: 'Economy',
      }, {
        text: 'Transportation',
      }, {
        text: 'Education',
      }
      ],
    }
  },
  components: {
    LocationMap,
    Navbar,
    Post,
    VueTagsInput,
    Tabs,
    Tab
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
  created: function() {
    this.getDistrict()
  },
  methods: {
    tagChanged: function(newTags) {
      this.tags = newTags;
      this.displayPosts = []
      this.posts.forEach(post => {
        let postTags = post.tags.split(',').map( x => x.toLowerCase())
        let add = false;
        this.tags.map( x => x.text.toLowerCase()).forEach(
          tag => {
            if (postTags.includes(tag)){
              add = true;
            }
          }
        )
        if (add) {
          this.displayPosts.push(post)
        }
      })
      if (this.displayPosts.length == 0){
        this.errors.push('No posts with that tag!') 
      }
      this.clearMessages();
    },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
      }, 5000);
    },
    getDistrict: function() {
      axios
        .get(`/api/districts/${this.id}` )
        .then((res) => {
          this.district = res.data.district;
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
        .get(`/api/posts/districts/${this.district.name.toLowerCase()}` )
        .then((res) => {
          this.posts = res.data.posts;
        })
        .catch(err => {
          // handle error 
          this.errors.push(err.response.data.error);
        })
    }}
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