<template>
  <div class="item">
    <div v-if='messages.length' class="success-message" style="text-align:center;">
        <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
        <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
        </ul>
    </div>
    <div v-if="this.edit">
        <div class="form-container">
            Name <input id='name' v-model.trim='name' type='text' name='name' :placeholder="`${resource.name}`">
            URL <input id='url' v-model.trim='url' type='text' name='url' :placeholder="`${resource.url}`">
            Description <input id='description' v-model.trim='description' type='text' name='description' :placeholder="`${resource.description}`">
        </div>
    </div>
    <div v-else>
      <a :href="`${resource.url}`" target="_blank">{{resource.name}}</a>
      <p>{{resource.description}}</p>
    </div>
    
    <div v-if="this.isRep">
      <div v-if="this.edit">
         <button class="button" v-on:click="saveresource">Save</button>
         {{'  '}}
         <button class="button" v-on:click="deleteresource">Delete</button>
         {{'  '}}
         <button class="button" v-on:click="edit = false">Cancel</button>
      </div>
      <div v-else>
        <button class="button" v-on:click="editresource">Edit</button>
      </div>
    </div>
    
  </div>
</template>

<style scoped>
    .item {
        padding: 32px;
        border-radius: 32px;
        box-shadow: 0px 0px 12px 6px #ddd;
        margin-bottom: 16px;
        width: 600px;
    }
    .form-container {
      margin: 32px;
    }
</style>

<script>
import axios from "axios";
import { eventBus } from "../main";

export default {
  name: "resource",
  props: {
      resource: Object,
      isMember: Boolean,
      isRep: Boolean,
      edit: false,
  },
  data() {
    return {
      messages: [],
      errors: [],
      name: this.resource.name,
      description: this.resource.description,
      url: this.resource.url
    }
  },
  methods: {
    editresource: function() {
      this.edit = true;
    },
    deleteresource: function() {
      axios
          .delete(`/api/resources/${this.resource.resource_id}`)
          .then((res) => {
              this.messages.push(res.data.message)
              eventBus.$emit('delete-resource-success', this.resource.resource_id);
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
    saveresource: function() {
      const bodyContent = { 
          name: this.name, 
          description: this.description,
          url: this.url,
          resource_status: this.resource_status,
          resource_id: this.resource.resource_id
      };
      axios
          .put(`/api/resources`, bodyContent)
          .then((res) => {
              this.messages.push(res.data.message)
              this.resource.name = this.name
              this.resource.description = this.description
              this.resource.url = this.url
              this.resource.resource_status = this.resource_status
          })
          .catch(err => {
              // handle error 
              this.errors.push(err.response.data.error);
          })
          .then(() => {
              // always executed
              this.edit = false
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
    resetForm: function() {
        this.name = ""
        this.description = ""
        this.url = ""
    },
  }
}
</script>
