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
        <p>You are a representative add a bill!</p>
        <form id="add-bill" v-on:submit.prevent="addBill" method="post" class="center">
        <div class="center form-container">
            <input id='billName' v-model.trim='billName' type='text' name='billName' placeholder="Bill Name">
            <input id='billDescription' v-model.trim='billDescription' type='text' name='billDescription' placeholder="Description">
            <input id='billClosingDate' v-model.trim='billClosingDate' type='text' name='billClosingDate' placeholder="Closing Date">
        </div>
        <input type='submit' value='Add' class="button">
        </form>
    </div>
    <div class="bills">
        <div v-if="government.bills == 0">No Bills yet!</div>
        <div v-for="bill in government.bills" v-bind:key="bill">
            <Bill v-bind:bill="bill" v-bind:isRep="isRep" v-bind:isMember="isMember"/>
        </div>
    </div>
    
  </div>
</template>
<style scoped>
    .form-container {
        margin-bottom: 32px;
    }
    .bills {
        margin: 32px;
    }
</style>
<script>
import Bill from "../components/Bill.vue";
import axios from "axios";
import { eventBus } from "../main";

export default {
    name: "Bills",
    props: {
        government: Object,
        isMember: Boolean,
        isRep: Boolean
    },
    data() {
        return {
            messages: [],
            errors: [],
            billName: "",
            billDescription: "",
            billClosingDate: "",
        }
    },
    components: {
        Bill
    },
    created: function() {
        eventBus.$on("delete-bill-success", (bill_id) => {
            this.government.bills =  this.government.bills.filter( bill => bill.bill_id != bill_id)
            this.messages.push("Bill deleted!")
        });
         eventBus.$on("added-bill-success", (bill) => {
            this.government.bills.push(bill)
        });
    },
    methods: {
        addBill: function() {
            const bodyContent = { 
                government_id: this.government.government_id, 
                name: this.billName,
                description: this.billDescription,
                closing_date: this.billClosingDate
            };
            axios
                .post(`/api/bills`, bodyContent)
                .then((res) => {
                    this.messages.push(res.data.message)
                    eventBus.$emit('added-bill-success', res.data.bill);
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
    }
}
</script>
