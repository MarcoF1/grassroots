<template>
  <div>
    <div v-if='messages.length' class="success-message" style="text-align:center;">
        <div v-for='message in messages' v-bind:key='message.id'>{{ message }}</div>
    </div>
    <div v-if='errors.length' class="error-message" style="width: 250px;">
        <ul>
            <li v-for='error in errors' v-bind:key='error.id'>{{ error }}</li>
        </ul>
    </div>
    <div v-if="this.edit">
        <div class="center form-container">
            Name <input id='name'  v-model.trim='name' type='text' name='name' :placeholder="`${government.name}`">
            Description <input id='description' v-model.trim='description' type='text' name='description' :placeholder="`${government.description}`">
            Contact Informaion <input id='contact' v-model.trim='contact' type='text' name='contact' :placeholder="`${government.contact}`">
            Address <input id='address' v-model.trim='address' type='text' name='address' :placeholder="`${government.address}`">
        </div>
    </div>
    <div v-else>
        <h1>{{government.name}}</h1>
        <p>Description: {{government.description}}</p>
        <p>Contact: {{government.contact}}</p>
        <p>Address: {{government.address}}</p>
    </div>
    <p>Reps: {{government.reps.length}}</p>
    <p>Members: {{government.users.length}}</p>
    <div v-if="isRep">
        <div v-if="edit">
            <button class="button" v-on:click="saveGovernment">Save</button>
            {{'  '}}
            <button class="button" v-on:click="deleteGovernment">Delete</button>
            {{'  '}}
            <button class="button" v-on:click="edit = false">Cancel</button>
        </div>
        <div v-else>
            <button class="button" v-on:click="leaveGovernment">Leave</button> 
            {{'  '}}
            <button class="button" v-on:click="editGovernment">Edit</button> 
        </div>
    </div>
    <div v-else-if="isSignedIn">
        <button v-if="!isMember" class="button" v-on:click="joinGovernment">Join</button> 
        <button v-else class="button" v-on:click="leaveGovernment">Leave</button> 
    </div>
    
  </div>
</template>
<style scoped>
</style>
<script>
import axios from "axios";

export default {
    name: "About",
    props: {
        government: Object,
        isMember: Boolean,
        isRep: Boolean,
        isSignedIn: Boolean
    },
    data() {
        return {
            messages: [],
            errors: [],
            edit: false,
            name: this.government.name,
            description: this.government.description,
            contact: this.government.contact,
            address: this.government.address
        }
    },
    components: {
    },
    methods: {
        editGovernment: function() {
            this.edit = true
        },
        saveGovernment: function() {

            if ( this.name == undefined){
                this.name = this.government.name
            } 
            if ( this.description == undefined){
                this.description = this.government.description
            }
            if ( this.address == undefined){
                this.address = this.government.address
            }
            if ( this.contact == undefined){
                this.contact = this.government.contact 
            }

            const bodyContent = { 
                name: this.name, 
                description: this.description,
                contact: this.contact,
                address: this.address,
                government_id: this.government.government_id
            };
            axios
                .put(`/api/governments`, bodyContent)
                .then((res) => {
                    this.messages.push(res.data.message)
                    this.government.name = this.name
                    this.government.description = this.description
                    this.government.contact = this.contact
                    this.government.address = this.address
                    this.edit = false
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
        joinGovernment: function() {
            const bodyContent = { government_id: this.government.government_id};
            axios
                .post(`/api/governments/join`, bodyContent)
                .then((res) => {
                    this.messages.push(res.data.message)
                    this.isMember = true;
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
        leaveGovernment: function() {
            axios
                .delete(`/api/governments/leave/${this.government.government_id}`)
                .then((res) => {
                    this.messages.push(res.data.message)
                    this.isMember = false;
                    this.isRep = false;
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
        deleteGovernment: function() {
            axios
                .delete(`/api/governments/${this.government.government_id}`)
                .then((res) => {
                    this.messages.push(res.data.message)
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
        clearMessages: function() {
            setInterval(() => {
                this.errors = [];
                this.messages = [];
            }, 5000);
        },
        resetForm: function() {
            this.name = ""
            this.description = ""
            this.contact = ""
            this.address = ""
        },
    }
}
</script>
