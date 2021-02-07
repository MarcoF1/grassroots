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
        <div class="stack">
            <input id='name' v-model.trim='name' type='text' name='name' :placeholder="`${government.name}`">
            <input id='description' v-model.trim='description' type='text' name='description' :placeholder="`${government.description}`">
            <input id='contact' v-model.trim='contact' type='text' name='contact' :placeholder="`${government.contact}`">
            <input id='address' v-model.trim='address' type='text' name='address' :placeholder="`${government.address}`">
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
    <button v-if="!isMember" class="button" v-on:click="joinGovernment">Join</button> 
    <button v-else class="button" v-on:click="leaveGovernment">Leave</button> 
    {{'  '}}
    <button v-if="isRep && !this.edit" class="button" v-on:click="editGovernment">Edit</button> 
    <button v-if="isRep && this.edit" class="button" v-on:click="saveGovernment">Save</button>
  </div>
</template>
<style scoped>
    .stack {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>
<script>
import axios from "axios";

export default {
    name: "About",
    props: {
        government: Object,
        isMember: Boolean,
        isRep: Boolean
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
            this.edit = false
            const bodyContent = { 
                name: this.name ?? this.government.name, 
                description: this.description ?? this.government.description,
                contact: this.contact ?? this.government.contact,
                address: this.address ?? this.government.address,
                old_gov: this.government 
            };
            axios
                .put(`/api/governments`, bodyContent)
                .then(() => {
                    this.messages.push("Succesfull Edit!")
                    this.government.name = this.name
                    this.government.description = this.description
                    this.government.contact = this.contact
                    this.government.address = this.address
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
        joinGovernment: function() {
        const bodyContent = { government_id: this.government_id};
        axios
            .post(`/api/governments/join`, bodyContent)
            .then(() => {
            this.messages.push("Joined new government!!")
            this.isMember = true;
            })
            .catch(err => {
            // handle error 
            this.errors.push(err.response.data.error);
            })
            .then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
            });
        },
        leaveGovernment: function() {
        axios
            .delete(`/api/governments/leave/${this.government_id}`)
            .then(() => {
            this.messages.push("Left government")
            this.isMember = false;
            this.isRep = false;
            })
            .catch(err => {
            // handle error 
            this.errors.push(err.response.data.error);
            })
            .then(() => {
            // always executed
            this.resetForm();
            this.clearMessages();
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
