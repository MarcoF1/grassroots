<template>
  <div class="center" >
    <div v-if='messages.length' class="success-message" style="text-align:center;">
        <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
        <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
        </ul>
    </div>
    <div v-if="isRep">
        <p>You are a representative add some resource links!</p>
        <form id="add-resource" v-on:submit.prevent="addResource" method="post" class="center">
        <div class="center form-container">
            <input id='resourceName' v-model.trim='resourceName' type='text' name='resourceName' placeholder="Resource Name">
            <input id='resourceURL' v-model.trim='resourceURL' type='text' name='resourceURL' placeholder="URL">
            <input id='resourceDescription' v-model.trim='resourceDescription' type='text' name='resourceDescription' placeholder="Description">
        </div>
        <input type='submit' value='Add' class="button">
        </form>
    </div>
    <div class="resources">
        <div v-if="government.resources == 0">No resources yet!</div>
        <div v-for="resource in government.resources" v-bind:key="resource">
            <Resource v-bind:resource="resource" v-bind:isRep="isRep" v-bind:isMember="isMember"/>
        </div>
    </div>
    
  </div>
</template>

<script>
import Resource from "../components/Resource.vue";
import axios from "axios";
import { eventBus } from "../main";

export default {
    name: "Resources",
    props: {
        government: Object,
        isMember: Boolean,
        isRep: Boolean
    },
    data() {
        return {
            messages: [],
            errors: [],
            resourceName: "",
            resourceURL: "",
            resourceDescription: "",
        }
    },
    components: {
        Resource
    },
    created: function() {
        eventBus.$on("delete-resource-success", (resource_id) => {
            this.government.resources =  this.government.resources.filter( resource => resource.resource_id != resource_id)
            this.messages.push("resource deleted!")
        });
         eventBus.$on("added-resource-success", (resource) => {
            this.government.resources.push(resource)
        });
    },
    methods: {
        addResource: function() {
            const bodyContent = { 
                government_id: this.government.government_id, 
                name: this.resourceName,
                url: this.resourceURL,
                description: this.resourceDescription
            };
            axios
                .post(`/api/resources`, bodyContent)
                .then((res) => {
                    this.messages.push(res.data.message)
                    eventBus.$emit('added-resource-success', res.data.resource);
                })
                .catch(err => {
                    // handle error 
                    this.errors.push(err.response.data.error);
                })
                .then(() => {
                    // always executed
                    this.clearMessages();
                    this.resetForm()
                });
        },
        clearMessages: function() {
            setInterval(() => {
                this.errors = [];
                this.messages = [];
            }, 5000);
        },
        resetForm: function() {
            this.resourceName =  ""
            this.resourceURL = ""
            this.resourceDescription = ""
        },
    }
}
</script>

<style scoped>
    .form-container {
        margin-bottom: 32px;
    }
    .resources {
        margin: 32px;
    }
</style>