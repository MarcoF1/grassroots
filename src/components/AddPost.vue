<template>
  <div class="wrapper">
    <input id='post' v-model.trim='post' type='text' name='post' placeholder="Post">
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags"
    />
    {{' '}}
    <button class="button" v-on:click="addPost">Post!</button> 
    <div v-if='messages.length' class="success-message" style="text-align:center;">
      <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
      <ul>
        <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    padding: 32px;
    border-radius: 32px;
    box-shadow: 0px 0px 12px 6px #eee;
    margin: 16px;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .button {
    margin-top: 16px;
  }

  input[type=text], select {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
</style>

<script>
import axios from "axios";
import { eventBus } from "../main";
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: "AddPost",
  props: {
  },
  data() {
    return {
      post: '',
      tag: '',
      messages: [],
      errors: [],
      tags: [],
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
    };
  },
  components: {
    VueTagsInput
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
  methods: {
    addPost: function() {
      const bodyContent = { text: this.post, tags: this.tags.map(tag => tag.text).join()};
        axios
          .post(`/api/posts`, bodyContent)
          .then((res) => {
            // handle success
            eventBus.$emit('post-success', res.data.post);
            this.messages.push(res.data.message);
            this.messages.push(res.data.post);
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
    },
    clearMessages: function() {
      setInterval(() => {
        this.messages = [];
        this.errors = [];
      }, 5000);
    },
    resetForm: function() {
      this.text = ""
      this.tag = ""
    },
  },
};
</script>
