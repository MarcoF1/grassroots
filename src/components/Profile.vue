<template>
  <div>
    <div>
        <div v-if='messages.length' class="success-message" style="text-align:center;">
          <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
        </div>
        <div v-if='errors.length' class="error-message" style="width: 250px;">
          <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
          </ul>
        </div>
    </div>
    <div v-if="this.edit">
        <div class="center form-container">
            Description <input id='description' v-model.trim='description' type='text' name='description' :placeholder="`${government.description}`">
        </div>
          <button class="button" v-on:click="saveProfile">Save</button>
          {{'  '}}
          <button class="button" v-on:click="edit = false">Cancel</button>
    </div>
    <div v-else>
      <p>username: {{username}}</p>
      <p>is_rep: {{user.is_rep}}</p>
      <p>description: {{user.description}}</p>
      <button class="button" v-on:click="edit = true">Edit</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  props: {
        government: Object,
        isMember: Boolean,
        isRep: Boolean
    },
  data() {
    return {
      username: this.$cookie.get('auth'),
      user_id: this.$cookie.get('auth-id'),
      user: {},
      messages: [],
      errors: [],
      government_id: parseInt(this.$route.params.id),
      edit: false,
      description: ''
    }
  },
  components: {

  },
  created() {
    this.getProfile()
  },
  methods: {
    getProfile: function() {
      axios
        .get(`/api/governments/profile/${this.government_id}`)
        .then((res) => {
            this.user = res.data.user
        })
        .catch(err => {
            // handle error 
            this.errors.push(err.response.data.error);
        })
        .then(() => {
            // always executed
            this.clearMessages();
        });
      },
    saveProfile: function() {
        if ( this.description == undefined){
            this.description = this.user.description
        }

        const bodyContent = { 
            description: this.description,
        };
        axios
            .put(`/api/governments/profile/${this.government_id}`, bodyContent)
            .then((res) => {
                this.messages.push(res.data.message)
                this.edit = false
                this.user.description = this.description
            })
            .catch(err => {
                // handle error 
                this.errors.push(err.response.data.error);
            })
            .then(() => {
                // always executed
                this.clearMessages();
                this.resetForm();
            });
        },
    clearMessages: function() {
      setInterval(() => {
        this.errors = [];
        this.messages = [];
      }, 5000);
    },
  }
}
</script>
