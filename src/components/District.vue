<template>
  <div>
    <Navbar/>
    <div class="wrap">
      <div class="top">
        <div>
        <!-- <LocationMap :coordinate="[42.3526, -71.1097]"/> -->
        <h1>{{district.name}}</h1>
        <button class="button" v-on:click="tagChanged">Follow</button>
        <h2>Represenatives:</h2>
        <h2>Description:</h2>
        
        <div v-if='messages.length' class="success-message" style="text-align:center;">
          <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
        </div>
        <div v-if='errors.length' class="error-message" style="width: 250px;">
          <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
          </ul>
        </div>
        </div>
      </div>

      <div class="overview">
        <Tabs :mode="mode">
          <tab title="Updates">Updates will go here!</tab>
          <tab title="Posts">
            <div>
              <div v-if="posts.length==0">
                No posts with tag: {{district.name}}
              </div>
              <div v-else>
                <Post  v-for="post in posts.slice().reverse()" :post="post" v-bind:key="post"/>
              </div>
            </div>
          </tab>
          <tab title="Schedule">Schedule will go here!</tab>
        </Tabs>
      </div>
      
      
    </div>
  </div>
</template>
<style scoped>
  .wrap {
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .top {
    display: flex;
    justify-content: space-between;
    padding-right: 32px;
    padding-top: 32px;
    width: 50%;
  }
  .overview {
    width: 50%;
  }

  @media only screen and (max-width: 800px) {
    .overview {
      width: 100%;
    }
    .top {
      width: 100%;
    }
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
      autocompleteItems: [],
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
        this.messages = [];
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
        .get(`/api/posts/topic/${this.district.name.toLowerCase()}` )
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