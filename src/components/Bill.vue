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
            Name <input id='name' v-model.trim='name' type='text' name='name' :placeholder="`${bill.name}`">
            Description <input id='description' v-model.trim='description' type='text' name='description' :placeholder="`${bill.description}`">
            Closing Date <input id='closing_date' v-model.trim='closing_date' type='text' name='closing_date' :placeholder="`${bill.closing_date}`">
            Status
            <div class="center-row">
              <input type="radio" id="one" value="In Progress" v-model="bill_status">
              <label for="one">In Progress</label>
              <br>
              <input type="radio" id="two" value="Passed" v-model="bill_status">
              <label for="two">Passed</label>
              <input type="radio" id="three" value="Not Passed" v-model="bill_status">
              <label for="three">Not Passed</label>
            </div>
            
        </div>
    </div>
    <div v-else>
      <p><strong>{{bill.name}}</strong></p>
      <p>Description: {{bill.description}}</p>
      <p>Closing Date: {{bill.closing_date}}</p>
      <p>Status: {{bill.bill_status}}</p>
    </div>
    
    <div v-if="this.isRep">
      <div v-if="this.edit">
         <button class="button" v-on:click="saveBill">Save</button>
         {{'  '}}
         <button class="button" v-on:click="deleteBill">Delete</button>
         {{'  '}}
         <button class="button" v-on:click="edit = false">Cancel</button>
      </div>
      <div v-else>
        <button class="button" v-on:click="editBill">Edit</button>
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
  name: "Bill",
  props: {
      bill: Object,
      isMember: Boolean,
      isRep: Boolean,
      edit: false,
  },
  data() {
    return {
      messages: [],
      errors: [],
      name: this.bill.name,
      description: this.bill.description,
      closing_date: this.bill.closing_date,
      bill_status: this.bill.bill_status,
    }
  },
  methods: {
    editBill: function() {
      this.edit = true;
    },
    deleteBill: function() {
      axios
          .delete(`/api/bills/${this.bill.bill_id}`)
          .then((res) => {
              this.messages.push(res.data.message)
              eventBus.$emit('delete-bill-success', this.bill.bill_id);
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
    saveBill: function() {
      const bodyContent = { 
          name: this.name, 
          description: this.description,
          closing_date: this.closing_date,
          bill_status: this.bill_status,
          bill_id: this.bill.bill_id
      };
      axios
          .put(`/api/bills`, bodyContent)
          .then((res) => {
              this.messages.push(res.data.message)
              this.bill.name = this.name
              this.bill.description = this.description
              this.bill.closing_date = this.closing_date
              this.bill.bill_status = this.bill_status
          })
          .catch(err => {
              // handle error 
              this.errors.push(err.response.data.error);
          })
          .then(() => {
              // always executed
              this.edit = false
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
