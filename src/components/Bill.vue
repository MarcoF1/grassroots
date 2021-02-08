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
        <div class="stack">
            <input id='name' v-model.trim='name' type='text' name='name' :placeholder="`${bill.name}`">
            <input id='description' v-model.trim='description' type='text' name='description' :placeholder="`${bill.description}`">
            <input id='closing_date' v-model.trim='closing_date' type='text' name='closing_date' :placeholder="`${bill.closing_date}`">
        </div>
    </div>
    <div v-else>
      <p><strong>{{bill.name}}</strong></p>
      <p>Description: {{bill.description}}</p>
      <p>Closing Date: {{bill.closing_date}}</p>
    </div>
    
    <button v-if="this.isRep && !this.edit" class="button" v-on:click="editBill">Edit</button> 
    <button v-if="this.isRep && this.edit" class="button" v-on:click="saveBill">Save</button>
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
    .stack {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
</style>

<script>
import axios from "axios";

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
      closing_date: this.bill.closing_date
    }
  },
  methods: {
    editBill: function() {
      this.edit = true;
    },
    saveBill: function() {
      const bodyContent = { 
          name: this.name, 
          description: this.description,
          closing_date: this.closing_date,
          old_bill: this.bill
      };
      axios
          .put(`/api/bills`, bodyContent)
          .then(() => {
              this.messages.push("Succesfull Edit!")
              this.bill.name = this.name
              this.bill.description = this.description
              this.bill.closing_date = this.closing_date
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
